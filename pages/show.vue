<template>
  <div class="show-container">
    <MeetAfterEntering v-if="isEntered" />
    <MeetBeforeEntering v-else />
    {{ campaign }}
  </div>
</template>
<script setup lang="ts">
const route = useRoute();
const isEntered = ref<boolean>(false);

const campaign = ref<CampaignObj>(null);

onMounted(async () => {
  if (route.query.enter === "after") isEntered.value = true;
  campaign.value = await $fetch<CampaignObj>(
    `http://localhost:4000/campaign/${route.query.id}`
  ).catch((error) => {
    console.log(error.data);
    throw Error;
  });
});
</script>

<style lang="scss" scoped></style>
