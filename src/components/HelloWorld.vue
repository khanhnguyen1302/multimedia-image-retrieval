<template>
  <!--   PHOTO-->
  <form>
    <input type="file" name="image" accept="image/*" @change="handleChange" />
    <button type="button" value="Upload Photo" @click="handleSubmit">
      touch me
    </button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const fileInput = ref(null);

const handleChange = (event) => {
  fileInput.value = event.target.files;
};

const handleSubmit = () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const formdata = new FormData();
  console.log(fileInput.value[0]);
  formdata.append("image", fileInput.value[0], "file12321312.png");

  // const requestOptions = {
  //   method: "POST",
  //   headers: myHeaders,
  //   body: formdata,
  //   redirect: "follow",
  // };

  // fetch("http://localhost:3000/upload/photo", requestOptions)
  //   .then((response) => console.log(response))
  //   .catch((error) => console.log("error", error));

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:3000/upload/photo",
    headers: {
      "Content-Type": "application/json",
    },
    data: formdata,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
