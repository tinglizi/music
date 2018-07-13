<template>
    <div>
      <mu-appbar style="width: 100%;" color="primary" z-depth="0">
        <mu-button icon slot="left">
          <mu-icon value="backup"></mu-icon>
        </mu-button>
        {{title}}
         <mu-button icon slot="right">
        <mu-icon value=""></mu-icon>
      </mu-button>
      </mu-appbar>
    </div>
</template>
<script>
export default{
  data () {
    return {}
  },
  props: ['title']
}
</script>
