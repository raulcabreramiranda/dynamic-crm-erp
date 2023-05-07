async function view(request, response) {
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(html);
}
const html = /*HTML*/ `
  <form method="post" action="/back" enctype="multipart/form-data">
    <label for="file">File</label>
    <input id="file" name="file" type="file" />
    <button>Upload</button>
  </form>
`;

exports.view = view;
