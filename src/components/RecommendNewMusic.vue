<template>
  <section>
    <!-- <h3><slot></slot></h3> -->
    <BorderedTitle><slot></slot></BorderedTitle>
    <ul>
      <SongItem
        @update:music="$emit('update:music', $event)"
        @update:playlist="$emit('update:playlist', newSongs)"
        v-for="(song, index) in newSongs"
        :key="song.id"
        :item="song"
        :index="index"
        :currentMusic="$attrs.currentMusic"
        :paused="$attrs.paused"
      />
    </ul>

    <ul>
      <!-- <Ment
        @update:music="$emit('update:music', $event)"
        @update:playlist="$emit('update:ment', newSongs)"
        v-for="(song, index) in newSongs"
        :key="song.id"
        :item="song"
        :index="index"
        :currentMusic="$attrs.currentMusic"
        :paused="$attrs.paused"
      >
      </Ment> -->
    </ul>
  </section>
</template>

<script>
import BorderedTitle from "@/components/BorderedTitle.vue";
import SongItem from "@/components/SongItem.vue";
// import Ment from "@/components/Ment.vue";

export default {
  props: {
    newSongs: {
      type: Array
    }
  },
  components: {
    BorderedTitle,
    SongItem
    // Ment
  }
};
</script>

<style></style>
