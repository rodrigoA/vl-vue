<template>
  <div class="hello">
    <div>
      <a v-for="lyric in lyrics_text"
         :lyric="lyric"></a>
    </div>

    <h1>{{ lyrics_text }}</h1>
    <h1>{{ description }}</h1>
    <h1>{{ albuns }}</h1>
    <h1>{{ genre }}</h1>
    <h1>{{ id }}</h1>
    <h1>{{ lyrics }}</h1>
    <h1>{{ pic_medium }}</h1>
    <h1>{{ pic_small }}</h1>
    <h1>{{ rank }}</h1>
    <h1>{{ related }}</h1>
    <h1>{{ toplyrics }}</h1>
    <h1>{{ url }}</h1>
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
        albuns: '',
        description: '',
        genre: '',
        id: '',
        lyrics: '',
        pic_medium: '',
        pic_small: '',
        rank: '',
        related: '',
        toplyrics: '',
        url: '',
        lyrics_text: []
      }
    },
    methods: {
      getArtist: async function () {
        vagalume.artist('ivete-sangalo').then(response => {
          console.log(response.artist)
          this.data = response.artist
          this.albuns = response.artist.albuns
          this.description = response.artist.description
          this.genre = response.artist.genre
          this.id = response.artist.id
          this.lyrics = response.artist.lyrics
          this.pic_medium = response.artist.pic_medium
          this.pic_small = response.artist.pic_small
          this.rank = response.artist.rank
          this.related = response.artist.related
          this.toplyrics = response.artist.toplyrics
          this.toplyrincstext = this.getAllTopLyricsText()
          this.url = response.artist.url
        })
      },
      getAllTopLyricsText: async function () {
        const lyricsIds = Object.values(this.data.toplyrics.item).map(item => item.id)

        for(let i = 0; i < lyricsIds.length; ++i) {
          vagalume.lyrics({ musid: lyricsIds[i] }).then(response => {
            console.log(response)
            this.lyrics_text[i] = response.mus[0].text
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