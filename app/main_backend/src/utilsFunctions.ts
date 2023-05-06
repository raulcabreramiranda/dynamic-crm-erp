import { SelectQueryBuilder } from 'typeorm';
import { Request } from 'express';

export const deleteEntity = async (entityManager, table, where) => {
  let query = `DELETE FROM ${table} WHERE `;
  query += Object.keys(where)
    .map((v, i) => `${v} = @${i}`)
    .join(' and ');

  const params = Object.values(where);
  return await entityManager.query(query, params);
};

export const updateQuery = async (entityManager, table, where, body) => {
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
  await entityManager.query(query, params);
  return body;
};

export const findQuery = async (entityManager, table, where, columns = []) => {
  let query = `SELECT ${columns.length > 0 ? columns.join(', ') : '*'} FROM ${table}`;
  query += ' WHERE ';
  query += Object.keys(where)
    .map((v, i) => `${v} = @${i}`)
    .join(' and ');

  const params = Object.values(where);
  // console.info({query, params})
  return await entityManager.query(query, params);
};

export const insertQuery = async (entityManager, table, body) => {
  const query = /* SQL*/ `INSERT INTO ${table} 
            (createdDate, lastModifiedDate, ${Object.keys(body).join(',')}) VALUES 
            ( GETDATE(), GETDATE(), ${Object.keys(body)
              .map((v, i) => `@${i}`)
              .join(', ')});SELECT MAX(id) as id FROM ${table}`;

  const params = Object.values(body);
  // console.info({query, params})
  return {
    ...(await entityManager.query(query, params)).pop(),
    ...body,
  };
};

export const getManyAndCount: any = async (options, filters, Entity, userRequest, selectColumns, repository) => {
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
export const getManyAndCount2: any = async ({ options, filters, Entity, userRequest, selectColumns, repository }: any) => {
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

export const getMany: any = async (options, filters, Entity, userRequest, selectColumns, repository) => {
  const _selectColumns = typeof selectColumns === 'string' ? JSON.parse(selectColumns) : selectColumns;
  const builder: SelectQueryBuilder<any> = executeSQL(options, filters, Entity, userRequest, _selectColumns, repository);

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

export const saveEmbedded: any = async (entityManager, Entity, fieldName, object) => {

  const columns = Entity.columnsMetaData();
  const objectId = object['id'];
  const objectEmbedded = object[fieldName];

  const EmbeddedEntity = columns[fieldName]
  const columnsEmbedded = EmbeddedEntity.columnsMetaData();
  const repository = entityManager.getRepository(EmbeddedEntity);
  
  if (Array.isArray(objectEmbedded)) {
    const resultId = []
    
    for (const key in objectEmbedded) {
      let _objectEmbedded = objectEmbedded[key];
      
      for (const _fieldName in _objectEmbedded) {
        if (Array.isArray(_objectEmbedded[_fieldName])) {
        
        } else if (typeof _objectEmbedded[_fieldName] === 'object' ){
          _objectEmbedded = await saveEmbedded(entityManager, EmbeddedEntity, _fieldName, _objectEmbedded[_fieldName]) 
        }
      }

      const _objectEmbeddedSave = await repository.save(_objectEmbedded);
      console.info("_objectEmbeddedSave", _objectEmbeddedSave)
      resultId.push({id: _objectEmbeddedSave.id})
    
    }
    object[fieldName] = resultId;
    return object;
  }
  const objectEmbeddedSave = await repository.save(object);

  object[fieldName] = {id: objectEmbeddedSave.id};
  return object;
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

  const builder = repository.createQueryBuilder('A0').where({});

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
    // .filter((v) => v['column'] && v['column'].split('.').length > 1)
    .forEach((v) => {
      const column = v['column'].split('.').length > 1 ? v['column'] : 'A0.' + v['column'];
      const parameter = {};
      const parameterName = column.split('.').join('_') + '_' + v['operation'];
      if ((v['value'] + '').trim()) {
        if (v['operation'] === 'in') {
          v['value'].split(',').map((v1, i) => {
            parameter[parameterName + '_' + i] = v1;
          });
          builder.andWhere(
            column +
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
            column +
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
          builder.andWhere(column + ' = :' + parameterName, parameter);
        } else if (v['operation'] === 'greaterThan') {
          parameter[parameterName] = v['value'];
          builder.andWhere(column + ' > :' + parameterName, parameter);
        } else if (v['operation'] === 'lessThan') {
          parameter[parameterName] = v['value'];
          builder.andWhere(column + ' < :' + parameterName, parameter);
        } else if (v['operation'] === 'greaterOrEqualThan') {
          parameter[parameterName] = v['value'];
          builder.andWhere(column + ' >= :' + parameterName, parameter);
        } else if (v['operation'] === 'lessOrEqualThan') {
          parameter[parameterName] = v['value'];
          builder.andWhere(column + ' <= :' + parameterName, parameter);
        } else if (v['operation'] === 'between') {
          parameter[parameterName + 'Start'] = v['value'].split(',')[0];
          builder.andWhere(column + ' > :' + parameterName + 'Start', parameter);
          parameter[parameterName + 'End'] = v['value'].split(',')[1];
          builder.andWhere(column + ' < :' + parameterName + 'End', parameter);
        } else if (v['operation'] === 'specified' && v['value'] == 'true') {
          builder.andWhere(column + ' is not null', parameter);
        } else if (v['operation'] === 'specified' && v['value'] == 'false') {
          builder.andWhere(column + ' is null', parameter);
        } else {
          parameter[parameterName] = '%' + v['value'] + '%';
          builder.andWhere(column + ' like :' + parameterName, parameter);
        }
      }
    });
  if (userRequest && userRequest['whiteLabel']) {
    builder.andWhere('(A0.whiteLabel = :A0_whiteLabel OR A0.whiteLabel is null)', {
      A0_whiteLabel: userRequest['whiteLabel'],
    });
  }

  if (options['order'] === 'RANDOM') {
    builder.addOrderBy('NEWID()', 'ASC');
  } else if (options['order']) {
    Object.keys(options['order']).forEach((element: string) => {
      const orderSplit = element.split('.');
      const allowColumns = { id: 1, ...Entity.columnsMetaData() };
      if (allowColumns[orderSplit[0]] === undefined) {
        let orderBySQL = element;
        orderBySQL.split(`this.`).join(`A0.`);
        options.relations.forEach((element, pos) => {
          orderBySQL = orderBySQL.split(`"${element}"`).join(`A${pos + 1}`);
        });
        builder.addOrderBy(orderBySQL, options['order'][element]);
      } else {
        let orderColumn = '';
        if (orderSplit.length > 1) {
          const pos = options.relations.indexOf(orderSplit.slice(0, -1).join('.'));
          orderColumn = `A${pos + 1}.${orderSplit.pop()}`;
        } else {
          orderColumn = `A0.${element}`;
        }
        builder.addOrderBy(orderColumn, options['order'][element]);

        if (_selectColumns.length > 0 && !_selectColumns.includes(orderColumn)) {
          _selectColumns.push(orderColumn);
        }
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

export function removeDuplicatesInArray(originalArray: Array<any>) {
  let uniqueArray = [];
  originalArray.forEach((element) => {
    if (!uniqueArray.includes(element)) {
      uniqueArray.push(element);
    }
  });
  return uniqueArray;
}

export async function createImage(imageData: Object, image, path, prefix = '') {
  const fs = require('fs');
  const re = /(?:\.([^.]+))?$/;

  const imageBase64 = imageData[`${image}Base64`];
  if (imageBase64) {
    const imageFileName = imageData[`${image}FileName`];
    const imageBDDir = imageData['forceImageName']
      ? trim(imageData['forceImageName'], '/').substr(0, trim(imageData['forceImageName'], '/').lastIndexOf('/'))
      : `arquivos/${imageData['clientId'] ? imageData['clientId'] + '/' : ''}${imageData['whiteLabel'] ? imageData['whiteLabel'] + '/' : ''}${path}/`;

    const imageBDName = imageData['forceImageName'] ? trim(imageData['forceImageName'], '/') : imageBDDir + prefix + Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2) + '.' + re.exec(imageFileName)[1];
    await fs.mkdirSync(imageBDDir, { recursive: true });
    await fs.writeFileSync(imageBDName, imageBase64.substring(imageBase64.indexOf(',') + 1), 'base64');

    // return s3Data.Location;
    return './' + imageBDName;
  }
}

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

    console.log('imageBDDir' + imageBDDir);

    const imageBDName = imageData['forceImageName'] ? trim(imageData['forceImageName'], '/') : imageBDDir + prefix + Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2) + '.' + re.exec(imageFileName)[1];
    console.log('imageBDName' + imageBDName);

    await fs.mkdir(imageBDDir, { recursive: true }, (err) => {
      try {
        if (err) {
          console.log('Erro upload');
          console.log(err);
        } else if (imageOldName && trim(imageOldName, '/') !== trim(imageData['forceImageName'], '/')) {
          fs.stat(imageOldName.replace(/^\/+|\/+$/g, ''), function (err, stats) {
            console.log(stats);
            if (err) {
              console.log('Erro upload - 2');
              return console.log(err);
            }
            fs.unlink(imageOldName.replace(/^\/+|\/+$/g, ''), function (err) {
              if (err) {
                console.log('Erro upload - 3');
                return console.error(err);
              }
              console.log('file deleted successfully');
            });
          });
        }
        require('fs').writeFile(imageBDName, imageBase64.substring(imageBase64.indexOf(',') + 1), 'base64', function (err) {
          console.log('Erro upload - 4');
          console.log(err);
        });
      } catch (error) {
        console.log('Erro upload - 5');
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