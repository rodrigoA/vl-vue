<template>
  <div class="hello">
    <div>
      <a v-for="lyric in lyrics_text" :key="lyric.id">
        {{ lyric.text }}
      </a>
    </div>
    <div id="chartdiv" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script lang="babel">

  import Vagalume from 'vagalume'
  const vagalume = new Vagalume('dfd39e6116e0a68f3588c08ee66822bb')

  export default {
    name: 'Artist',
    data() {
      return {
        data: this.getArtist(),
        lyrics_text: []
      }
    },
    methods: {
      getArtist: async function () {
        vagalume.artist('ivete-sangalo').then(response => {
          console.log(response.artist)
          this.data = response.artist
          this.toplyrincstext = this.getAllTopLyricsText()
        })
      },
      getAllTopLyricsText: async function () {
        const lyricsIds = Object.values(this.data.toplyrics.item).map(item => item.id)

        for(let i = 0; i < lyricsIds.length; ++i) {
          vagalume.lyrics({ musid: lyricsIds[i] }).then(response => {
            console.log(response)
            this.lyrics_text[i] = response.mus[0]
          })
        }
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
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