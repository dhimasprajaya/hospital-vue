import firebase from "../../firebase";

const actions = {
  uploadImage: ({ dispatch }, payload) => {
    if(payload.file === null) return
    
    return new Promise((resolve, reject) => {
      // Setup Firebase
      var storage = firebase.storage();
      var storageRef = storage.ref();

      var uploadTask = storageRef
        .child(payload.folder + "/" + payload.filename)
        .put(payload.file);

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          dispatch("loading", true);

          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log("Upload is " + progress + "% done");

          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED:
              // console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING:
              // console.log("Upload is running");
              break;
          }
        },
        (error) => {
          dispatch("loading", false);

          switch (error.code) {
            case "storage/unauthorized":
              reject("Unauthorized");
              break;
            case "storage/canceled":
              reject("User canceled the upload");
              break;
            case "storage/unknown":
              reject("Unknown error occured");
              break;
          }
        },
        // Success Upload
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            dispatch("loading", false);

            resolve(downloadURL);
          });
        }
      );
    });
  },
};

export default {
  actions,
};
