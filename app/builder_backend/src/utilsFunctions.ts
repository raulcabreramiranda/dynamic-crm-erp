import { createQueryBuilder, Equal, getManager, SelectQueryBuilder } from 'typeorm';
import { Request } from 'express';

export const deleteEntity = async (table, where) => {
  let query = `DELETE FROM ${table} WHERE `;
  query += Object.keys(where)
    .map((v, i) => `${v} = @${i}`)
    .join(' and ');

  const params = Object.values(where);
  return await getManager().query(query, params);
};

export const updateQuery = async (table, where, body) => {
  let query = /* SQL*/ `UPDATE ${table} SET 
                            lastModifiedDate = GETDATE(),
                            ${Object.keys(body)
                              .map((v, i) => `${v} = @${i}`)
                              .join(', ')} 
                        WHERE                             
                          `;
  query += Object.keys(where)
    .map((v, i) => `${v} = @${Object.values(body).length + i}`)
    .join(' and ');

  const params = [...Object.values(body), ...Object.values(where)];
  // console.info({query, params})
  await getManager().query(query, params);
  return body;
};

export const findQuery = async (table, where, columns = []) => {
  let query = `SELECT ${columns.length > 0 ? columns.join(', ') : '*'} FROM ${table}`;
  query += ' WHERE ';
  query += Object.keys(where)
    .map((v, i) => `${v} = @${i}`)
    .join(' and ');

  const params = Object.values(where);
  // console.info({query, params})
  return await getManager().query(query, params);
};

export const insertQuery = async (table, body) => {
  const query = /* SQL*/ `INSERT INTO ${table} 
            (createdDate, lastModifiedDate, ${Object.keys(body).join(',')}) VALUES 
            ( GETDATE(), GETDATE(), ${Object.keys(body)
              .map((v, i) => `@${i}`)
              .join(', ')});SELECT MAX(id) as id FROM ${table}`;

  const params = Object.values(body);
  // console.info({query, params})
  return {
    ...(await getManager().query(query, params)).pop(),
    ...body,
  };
};

export const getManyAndCount: any = async (options, filters, Entity, userRequest, selectColumns, repository = null) => {
  const _selectColumns = typeof selectColumns === 'string' ? JSON.parse(selectColumns) : selectColumns;
  const builder: SelectQueryBuilder<any> = executeSQL(options, filters, Entity, userRequest, _selectColumns, repository);

  const result = await builder.getManyAndCount();
  //  const query = highlight(builder.getSql(), { language: 'sql', ignoreIllegals: true });
  //  const parameters = highlight(
  //    JSON.stringify({ TIME: Date.now() - now, ...builder.getParameters() }),
  //    { language: 'json', ignoreIllegals: true }
  //  );
  return result;
};
export const getManyAndCount2: any = async ({options, filters, Entity, userRequest, selectColumns, repository}: any) => {
  const _selectColumns = typeof selectColumns === 'string' ? JSON.parse(selectColumns) : selectColumns;
  const builder: SelectQueryBuilder<any> = executeSQL(options, filters, Entity, userRequest, _selectColumns, repository);

  const result = await builder.getManyAndCount();
  //  const query = highlight(builder.getSql(), { language: 'sql', ignoreIllegals: true });
  //  const parameters = highlight(
  //    JSON.stringify({ TIME: Date.now() - now, ...builder.getParameters() }),
  //    { language: 'json', ignoreIllegals: true }
  //  );
  return result;
};

export const getMany: any = async (options, filters, Entity, userRequest, selectColumns) => {
  const _selectColumns = typeof selectColumns === 'string' ? JSON.parse(selectColumns) : selectColumns;
  const builder: SelectQueryBuilder<any> = executeSQL(options, filters, Entity, userRequest, _selectColumns);

  const result = await builder.getMany();
  /* 
  const now = Date.now();
  const query = highlight(builder.getSql(), { language: 'sql', ignoreIllegals: true });
  const parameters = highlight(
    JSON.stringify({ TIME: Date.now() - now, ...builder.getParameters() }),
    { language: 'json', ignoreIllegals: true }
  ); */

  return result;
};

const executeSQL: any = (options, filters, Entity, userRequest, selectColumns, repository) => {
  // const instance = new Entity()
  // console.log(instance)

  let _selectColumns = [];
  if (selectColumns) {
    _selectColumns = Array.isArray(selectColumns) ? selectColumns : Object.keys(transformJSONObjectToArray(selectColumns));
  }
  _selectColumns = [..._selectColumns.map((v) => (v.split('.').length === 1 ? `A0.${v}` : v))];

  options.relations = options.relations ? options.relations : [];

  let _filters = [...filters];
  _filters
    .filter((v) => v['column'] && v['column'].split('.').length > 1)
    .map((v) => {
      const pos = options.relations.indexOf(v['column'].split('.').slice(0, -1).join('.'));
      if (pos < 0) {
        options.relations.push(v['column'].split('.').slice(0, -1).join('.'));
      }
    });

  _selectColumns
    .filter((v) => v && v.split('.').length > 1 && v.split('.')[0] != 'A0')
    .forEach((v) => {
      const pos = options.relations.indexOf(v.split('.').slice(0, -1).join('.'));
      if (pos < 0) {
        options.relations.push(v.split('.').slice(0, -1).join('.'));
      }
    });


  const builder = repository.createQueryBuilder('A0').where(options.where || {});
  const myJoin = {};
  const filterJoinWhiteLabel = (i, element) => {
    let EleArray = Entity;
    for (const key in element.split('.')) {
      EleArray = EleArray.columnsMetaData()[element.split('.')[key]];
    }

    const hasWhiteLabel = typeof EleArray.columnsMetaData()['whiteLabel'] !== 'undefined';
    if (userRequest && userRequest['whiteLabel'] && hasWhiteLabel) {
      return `(("A${i + 1}"."whiteLabel" is null OR "A${i + 1}"."whiteLabel" = :A0_whiteLabel ))`;
    }
    return ``;
  };

  const paramJoinWhiteLabel = (i, element) => {
    let EleArray = Entity;
    for (const key in element.split('.')) {
      EleArray = EleArray.columnsMetaData()[element.split('.')[key]];
    }

    const hasWhiteLabel = typeof EleArray.columnsMetaData()['whiteLabel'] !== 'undefined';
    if (userRequest && userRequest['whiteLabel'] && hasWhiteLabel) {
      return { A0_whiteLabel: userRequest['whiteLabel'] };
    }
    return {};
  };

  options.relations.forEach((element, i) => {
    if (element.split('.').length > 0) {
      const pos = options.relations.indexOf(element.split('.').slice(0, -1).join('.'));
      myJoin[element] = `A${i + 1}`;

      builder.leftJoinAndSelect(`A${pos + 1}.${element.split('.').pop()}`, `A${i + 1}`, filterJoinWhiteLabel(i, element), paramJoinWhiteLabel(i, element));

      _filters = _filters.map((v) => (v['column'].split('.').slice(0, -1).join('.') != element ? { ...v } : { ...v, column: `A${i + 1}.${v['column'].split('.').pop()}` }));
      _selectColumns = _selectColumns.map((v) => {
        return v.split('.').slice(0, -1).join('.') != element ? v : `A${i + 1}.${v.split('.').pop()}`;
      });
    } else if (element.split('.')[0]) {
      builder.leftJoinAndSelect(`A0.${element}`, `A${i + 1}`, filterJoinWhiteLabel(i, element), paramJoinWhiteLabel(i, element));
      _filters = _filters.map((v) => (v['column'].split('.').slice(0, -1).join('.') != element ? { ...v } : { ...v, column: `A${i + 1}.${v['column'].split('.').pop()}` }));
      _selectColumns = _selectColumns.map((v) => {
        return v.split('.').slice(0, -1).join('.') != element ? v : `A${i + 1}.${v.split('.').pop()}`;
      });
    }
  });

  _filters
    .filter((v) => v['column'] && v['column'].split('.').length > 1)
    .forEach((v) => {
      const parameter = {};
      const parameterName = v['column'].split('.').join('_') + '_' + v['operation'];
      if ((v['value'] + '').trim()) {
        if (v['operation'] === 'in') {
          v['value'].split(',').map((v1, i) => {
            parameter[parameterName + '_' + i] = v1;
          });
          builder.andWhere(
            v['column'] +
              ' in (' +
              v['value']
                .split(',')
                .map((v1, i) => ':' + parameterName + '_' + i)
                .join(', ') +
              ')',
            parameter
          );
        } else if (v['operation'] === 'notIn') {
          v['value'].split(',').map((v1, i) => {
            parameter[parameterName + '_' + i] = v1;
          });
          builder.andWhere(
            v['column'] +
              ' not in (' +
              v['value']
                .split(',')
                .map((v1, i) => ':' + parameterName + '_' + i)
                .join(', ') +
              ')',
            parameter
          );
        } else if (v['operation'] === 'equals') {
          parameter[parameterName] = v['value'];
          builder.andWhere(v['column'] + ' = :' + parameterName, parameter);
        } else if (v['operation'] === 'greaterThan') {
          parameter[parameterName] = v['value'];
          builder.andWhere(v['column'] + ' > :' + parameterName, parameter);
        } else if (v['operation'] === 'lessThan') {
          parameter[parameterName] = v['value'];
          builder.andWhere(v['column'] + ' < :' + parameterName, parameter);
        } else if (v['operation'] === 'greaterOrEqualThan') {
          parameter[parameterName] = v['value'];
          builder.andWhere(v['column'] + ' >= :' + parameterName, parameter);
        } else if (v['operation'] === 'lessOrEqualThan') {
          parameter[parameterName] = v['value'];
          builder.andWhere(v['column'] + ' <= :' + parameterName, parameter);
        } else if (v['operation'] === 'specified' && v['value'] == 'true') {
          builder.andWhere(v['column'] + ' is not null', parameter);
        } else if (v['operation'] === 'specified' && v['value'] == 'false') {
          builder.andWhere(v['column'] + ' is null', parameter);
        } else {
          parameter[parameterName] = '%' + v['value'] + '%';
          builder.andWhere(v['column'] + ' like :' + parameterName, parameter);
        }
      }
    });
  if (userRequest && userRequest['whiteLabel']) {
    builder.andWhere('(A0.whiteLabel = :A0_whiteLabel OR A0.whiteLabel is null)', {
      A0_whiteLabel: userRequest['whiteLabel'],
    });
  }

  if (options['order'] === 'RANDOM') {
    builder.orderBy('NEWID()', 'ASC');
  } else if (options['order']) {
    Object.keys(options['order']).forEach((element) => {
      let orderColumn = '';
      if (element.split('.').length > 1) {
        const pos = options.relations.indexOf(element.split('.').slice(0, -1).join('.'));
        orderColumn = `A${pos + 1}.${element.split('.').pop()}`;
      } else {
        orderColumn = `A0.${element}`;
      }
      builder.orderBy(orderColumn, options['order'][element]);

      if (_selectColumns.length > 0 && !_selectColumns.includes(orderColumn)) {
        _selectColumns.push(orderColumn);
      }
    });
  }
  if (options['take']) {
    builder.take(options['take']);
  }
  if (options['skip']) {
    builder.skip(options['skip']);
  }
  if (_selectColumns.length > 0) {
    builder.select(_selectColumns);
  }

  return builder;
};

function transformJSONObjectToArray(obj, prefix?) {
  if (Array.isArray(obj)) {
    obj = obj[0];
  }

  const res = {};
  for (const k of Object.keys(obj)) {
    const val = obj[k];
    const key = prefix ? prefix + '.' + k : k;
    if (typeof val === 'object') Object.assign(res, transformJSONObjectToArray(val, key));
    else res[key] = val;
  }
  return res;
}

export async function uploadFile(req: Request, adminUser: Object, image, path, prefix = '') {
  const fs = require('fs');
  const re = /(?:\.([^.]+))?$/;

  const imageOldName = adminUser[image];
  const imageBase64 = req.body[`${image}Base64`];
  if (imageBase64) {
    const imageFileName = req.body[`${image}FileName`];
    const imageBDDir = `arquivos/${req['user']['clientId'] ? req['user']['clientId'] + '/' : ''}${req['user']['whiteLabel'] ? req['user']['whiteLabel'] + '/' : ''}${path}/`;
    const imageBDName = imageBDDir + prefix + Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2) + '.' + re.exec(imageFileName)[1];

    await fs.mkdir(imageBDDir, { recursive: true }, (err) => {
      try {
        if (err) console.log(err);
        else if (imageOldName) {
          fs.stat(imageOldName.replace(/^\/+|\/+$/g, ''), function (err, stats) {
            console.log(stats);
            if (err) return console.log(err);
            fs.unlink(imageOldName.replace(/^\/+|\/+$/g, ''), function (err) {
              if (err) return console.error(err);
              console.log('file deleted successfully');
            });
          });
        }
        require('fs').writeFile(imageBDName, imageBase64.substring(imageBase64.indexOf(',') + 1), 'base64', function (err) {
          console.log(err);
        });
      } catch (error) {
        console.info(error);
      }
    });
    const s3Data = await uploadFileS3(imageBDName, imageBase64);
    console.info(s3Data);

    return '/' + imageBDName;
  }
  return adminUser[image];
}

// async function describeLogStreams() {
//     const AWS = require('aws-sdk');

//     const cloudwatchlogs = new AWS.CloudWatchLogs({ region: process.env.AWS_REGION });
//     const params = { logGroupName: process.env.AWS_CW_GROUP, };
//     return cloudwatchlogs.describeLogStreams(params).promise();
// }

// export async function createLog(logStream, message) {
//     let nextSequenceToken = null;
//     const AWS = require('aws-sdk');
//     if (!nextSequenceToken) {
//         const res = await describeLogStreams();
//         nextSequenceToken = res.logStreams.filter(v=>v.logStreamName === logStream)[0].uploadSequenceToken;
//         console.info(logStream, nextSequenceToken, res)
//     }

//     const cloudwatchlogs = new AWS.CloudWatchLogs({ region: process.env.AWS_CW_REGION });
//     const params = {
//         logEvents: [{message, timestamp: (new Date()).getTime()}],
//         logGroupName: process.env.AWS_CW_GROUP,
//         logStreamName: logStream,
//         sequenceToken: nextSequenceToken
//     };
//     const response = await cloudwatchlogs.putLogEvents(params).promise();
//     nextSequenceToken = response.nextSequenceToken;
//     return response;
// }

// async function saveLogDynamoDB(TableName, Item) {
//   const AWS = require('aws-sdk');

//   return new Promise(function (resolve, reject) {
//     const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10', region: process.env.AWS_REGION });
//     ddb.putItem(
//       { TableName, Item: { ...Item, uuid: { S: new Date().toISOString() } } },
//       function (error, response) {
//         if (error) {
//           console.error('QueryError in execQuery', error);
//           resolve({ success: false, error });
//         } else {
//           console.error('Success', response);
//           resolve({ success: true, response });
//         }
//       }
//     );
//   });
// }

async function uploadFileS3(fileName, fileContent) {
  const AWS = require('aws-sdk');

  // console.info((new Date()).toISOString())
  // await saveLogDynamoDB(
  //      'LogsGerar',
  //      {
  //       'CUSTOMER_ID' : {N: '001'},
  //       'CUSTOMER_NAME1' : {S: 'Richard Roe3'}
  //     }
  // );
  // console.info((new Date()).toISOString())

  const s3 = new AWS.S3({ apiVersion: '2006-03-01', region: process.env.AWS_REGION });
  //   const fileContent = fs.readFileSync(filePath);
  const buf = Buffer.from(fileContent.replace(/^data:image\/\w+;base64,/, ''), 'base64');

  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: fileName,
    Body: buf,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg',
  };

  console.info({ parameters: params });
  const data = await s3.upload(params).promise();
  console.info({ replay: data });
  return data;
}

// async function listObjectsS(filter) {
//   const AWS = require('aws-sdk');

//   const s3 = new AWS.S3({ apiVersion: '2006-03-01', region: process.env.AWS_REGION });
//   const params = {
//     Bucket: process.env.AWS_S3_BUCKET,
//     Prefix: decodeURIComponent(filter),
//   };

//   const result = await s3.listObjectsV2(params).promise();
//   return result.Contents.map((item) => item.Key);
// }

// async function describeLogStreams() {
//     const AWS = require('aws-sdk');

//     const cloudwatchlogs = new AWS.CloudWatchLogs({ region: process.env.AWS_REGION });
//     const params = { logGroupName: process.env.AWS_CW_GROUP, };
//     return cloudwatchlogs.describeLogStreams(params).promise();
// }

// export async function createLog(logStream, message) {
//     let nextSequenceToken = null;
//     const AWS = require('aws-sdk');
//     if (!nextSequenceToken) {
//         const res = await describeLogStreams();
//         nextSequenceToken = res.logStreams.filter(v=>v.logStreamName === logStream)[0].uploadSequenceToken;
//         console.info(logStream, nextSequenceToken, res)
//     }

//     const cloudwatchlogs = new AWS.CloudWatchLogs({ region: process.env.AWS_CW_REGION });
//     const params = {
//         logEvents: [{message, timestamp: (new Date()).getTime()}],
//         logGroupName: process.env.AWS_CW_GROUP,
//         logStreamName: logStream,
//         sequenceToken: nextSequenceToken
//     };
//     const response = await cloudwatchlogs.putLogEvents(params).promise();
//     nextSequenceToken = response.nextSequenceToken;
//     return response;
// }

export async function uploadFile2(imageData: Object, adminUser: Object, image, path, prefix = '') {
  const fs = require('fs');
  const re = /(?:\.([^.]+))?$/;

  const imageOldName = adminUser[image];
  const imageBase64 = imageData[`${image}Base64`];
  if (imageBase64) {
    const imageFileName = imageData[`${image}FileName`];
    const imageBDDir = imageData['forceImageName']
      ? trim(imageData['forceImageName'], '/').substr(0, trim(imageData['forceImageName'], '/').lastIndexOf('/'))
      : `arquivos/${imageData['clientId'] ? imageData['clientId'] + '/' : ''}${imageData['whiteLabel'] ? imageData['whiteLabel'] + '/' : ''}${path}/`;

    const imageBDName = imageData['forceImageName'] ? trim(imageData['forceImageName'], '/') : imageBDDir + prefix + Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2) + '.' + re.exec(imageFileName)[1];
    await fs.mkdir(imageBDDir, { recursive: true }, (err) => {
      try {
        if (err) console.log(err);
        else if (imageOldName && trim(imageOldName, '/') !== trim(imageData['forceImageName'], '/')) {
          fs.stat(imageOldName.replace(/^\/+|\/+$/g, ''), function (err, stats) {
            console.log(stats);
            if (err) return console.log(err);
            fs.unlink(imageOldName.replace(/^\/+|\/+$/g, ''), function (err) {
              if (err) return console.error(err);
              console.log('file deleted successfully');
            });
          });
        }
        require('fs').writeFile(imageBDName, imageBase64.substring(imageBase64.indexOf(',') + 1), 'base64', function (err) {
          console.log(err);
        });
      } catch (error) {
        console.info(error);
      }
    });

    const s3Data = await uploadFileS3(imageBDName, imageBase64);
    console.info(s3Data);

    // return s3Data.Location;
    return '/' + imageBDName;
  }
}

export const trim = (s: string, c: string) => {
  if (!s) return s;
  if (c === ']') c = '\\]';
  if (c === '^') c = '\\^';
  if (c === '\\') c = '\\\\';
  return s.replace(new RegExp('^[' + c + ']+|[' + c + ']+$', 'g'), '');
};
