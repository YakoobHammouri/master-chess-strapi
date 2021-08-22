module.exports = {
  // ...
  settings: {
    parser: {
      // ...
      formLimit: "100mb", // modify here limit of the form body
      jsonLimit: "100mb", // modify here limit of the JSON body
      textLimit: "100mb", // modify here limit of the text body
      formidable: {
        maxFileSize: 1000 * 1024 * 1024, // multipart data, modify here limit of uploaded file size
      },
    },
  },
};
