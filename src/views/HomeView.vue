<template>
  <div class="home">
    <h1 class="p-10">Home view</h1>
    <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae amet inventore ullam accusamus ipsum aliquam culpa similique soluta doloribus dolorum officia ducimus, nobis necessitatibus fuga, voluptatibus quam optio omnis tenetur.</div>
    <div class="grid grid-cols-3 gap-3 pt-20 pb-20">
      <div class="card">
        <span>Title</span>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque cumque commodi incidunt! Ad explicabo corrupti, alias facilis ducimus saepe. Amet dolorem repellendus nam saepe.
        </p>
      </div>
      <div class="card">
        <span>Title</span>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque cumque commodi incidunt! Ad explicabo corrupti, alias facilis ducimus saepe. Amet dolorem repellendus nam saepe.
        </p>
      </div>
      <div class="card">
        <span>Title</span>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque cumque commodi incidunt! Ad explicabo corrupti, alias facilis ducimus saepe. Amet dolorem repellendus nam saepe.
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
};
</script>

<style  scoped>
.home h1, div {
  color: #157e7e;
  font-weight: 700;
  font-size: 20px;
}

.card span {
  font-size: 20px;
  font-weight: 700;
}
.card p {
  font-size: 20px;
  font-weight: 500;
  color: #0d4b4b;
}
</style>
