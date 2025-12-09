<template>
    <div class="saved-locations" v-if="locations.length">
    <h3>Saved Locations</h3>
    <ul>
    <li
    v-for="(city, index) in locations"
    :key="index"
    class="location-item"
    >
<span @click="$emit('select', city)"
 class="city-name"
> 
{{ city }}
</span>

<button
class="remove-btn"
@click="$emit('remove', city)"
>
X
</button>
</li>
    </ul>
    </div>
</template>

<script>
export default {
    name: "SavedLocations",

    props: {
    locations: {
    type: Array,
    default: () => []
    }
    }
};
</script>
