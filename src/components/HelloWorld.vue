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

  axios
    .post("http://localhost:3000/upload/photo", formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log(res);
    });
};
</script>
