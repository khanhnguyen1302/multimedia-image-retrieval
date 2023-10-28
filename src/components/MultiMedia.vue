<template>
  <h2>Multimedia Image Retrieval Playgrounds of DoubleK</h2>
  <form>
    <label for="file-upload" class="custom-file-upload"> Choose a file </label>
    <input
      id="file-upload"
      label="Choose Image"
      type="file"
      name="image"
      accept="image/*"
      class="input-hidden"
      @change="handleChange"
    />
    <button type="button" value="Upload Photo" @click="handleSubmit">
      Upload to get retrieve images
    </button>
    <div class="image-container">
      <img v-if="imgSrc" class="preview-img" :src="imgSrc" />
      <img v-else class="preview-img" src="./../assets/no-image.jpeg" />
    </div>
    <div>Please select the number of images you want to retrieve:</div>

    <select v-model="selected">
      <option disabled value="">Please select one</option>
      <option v-for="opt in options" :value="opt" :key="opt">
        {{ opt }} images
      </option>
    </select>

    <div class="retrieve">
      <button type="button" value="Upload Photo" @click="handleSubmit">
        Get retrieve images
      </button>
    </div>

    <div class="result-container">
      <div class="preview-img-small" v-for="index in selected" :key="index">
        {{ index }}
      </div>
    </div>

    <!-- <button type="button" value="Upload Photo" @click="testPy">testPy</button> -->
  </form>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const fileInput = ref(null);
const imgSrc = ref("");
const selected = ref(5);
const options = [5, 10, 15, 20];

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

// const testPy = () => {
//   const myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");

//   axios
//     .get("http://localhost:3000/name?firstname=Ram&lastname=Sharma", {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     })
//     .then((res) => {
//       console.log(res);
//     });
// };
</script>

<style>
.preview-img {
  width: 200px;
  height: 200px;
  object-fit: contain;

  border: 1px solid black;
}

.preview-img-small {
  width: 100px;
  height: 100px;
  object-fit: contain;

  border: 1px solid black;
}

.retrieve {
  margin-top: 20px;
}

.input-hidden {
  display: none;
}

.custom-file-upload {
  background-color: #eee;
  border: none;
  padding: 10px 10px;
  border-radius: 8px;
  margin-right: 10px;
}

.image-container {
  min-width: 50px;
  min-height: 50px;
  margin-top: 20px;
  padding: 10px;
}

.result-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}
</style>
