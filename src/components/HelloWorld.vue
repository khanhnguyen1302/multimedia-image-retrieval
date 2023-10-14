<template>
  <!--   PHOTO-->
  <form>
    <input
      label="Choose Image"
      type="file"
      name="image"
      accept="image/*"
      @change="handleChange"
    />
    <button type="button" value="Upload Photo" @click="handleSubmit">
      Upload to get retrieve images
    </button>
    <div>
      <img class="preview-img" :src="imgSrc" />
    </div>
    <div>Please select the number of images you want to retrieve:</div>

    <select v-model="selected">
      <option disabled value="">Please select one</option>
      <option :value="5">5 images</option>
      <option :value="10">10 images</option>
      <option :value="15">15 images</option>
    </select>

    <div class="retrieve">
      <button type="button" value="Upload Photo" @click="handleSubmit">
        Get retrieve images
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const fileInput = ref(null);
const imgSrc = ref("");
const selected = ref(5);

const handleChange = (event) => {
  fileInput.value = event.target.files;

  imgSrc.value = URL.createObjectURL(event.target.files[0]);
};

const handleSubmit = () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const formdata = new FormData();
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

<style>
.preview-img {
  max-width: 100px;
  max-height: 100px;
}

.retrieve {
  margin-top: 50px;
}
</style>
