<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  />
  <h2>Multimedia Image Retrieval Playgrounds of DoubleK</h2>
  <form>
    <label for="file-upload" class="custom-file-upload"> Choose a file </label>
    <input
      id="file-upload"
      label="Choose Image"
      type="file"
      name="image"
      accept="image/png"
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
      <button type="button" value="Upload Photo" @click="handleRetrieve">
        <span v-if="!isLoading">Get retrieve images</span>
        <i v-else class="fa fa-spinner fa-spin"></i>
      </button>
    </div>

    <div v-if="!list || list.length < selected" class="result-container">
      <div class="preview-img-small" v-for="index in selected" :key="index">
        <span>{{ index }}</span>
      </div>
    </div>

    <div v-else class="result-container">
      <div class="preview-img-small" v-for="index in selected" :key="index">
        <img class="preview-img-small" :src="getImgUrl(list[index - 1])" />
        {{ getInstanceName(list[index - 1]) }}
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const fileInput = ref(null);
const imgSrc = ref("");
const selected = ref(5);
const options = [5, 10, 15, 20];
const isLoading = ref(false);
const list = ref([]);

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

const getImgUrl = (pic) => {
  console.log(pic);
  return require("./../data/train/" + pic);
};

const getInstanceName = (name) => {
  if (!name) return "";

  return name.split("/")[0];
};

const handleRetrieve = async () => {
  isLoading.value = true;
  const data = {
    k: selected.value,
    query_image:
      "/Users/khanhnguyen/workspace/study/multimedia-image-retrieval/node-upload/uploads/image-uploaded.png",
  };

  const response = await fetch("http://localhost:9999/test", {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (result?.list_image_retrieved) {
    list.value = result?.list_image_retrieved;
  }

  console.log(list.value[0]);

  isLoading.value = false;
};
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
  gap: 30px;
  margin-top: 30px;
}

.balls {
  width: 1.5rem;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
}

.balls div {
  width: 0.4em;
  height: 0.4em;
  border-radius: 50%;
  background-color: #fc2f70;
  transform: translateY(-100%);
  animation: wave 0.8s ease-in-out alternate infinite;
}

.balls div:nth-of-type(1) {
  animation-delay: -0.4s;
}

.balls div:nth-of-type(2) {
  animation-delay: -0.2s;
}

@keyframes wave {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(100%);
  }
}

.submit-button {
  min-width: 150px;
  align-items: center;
}
</style>
