
import React from 'react'
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native'


type ArticleProps = {
  title: string
  publisherName: string
  author: string
  description: string
  imageUrl: string
  url: string
}

const Article = (article: ArticleProps) => (
  <View style={styles.item}>
    <View style={styles.header}>
      <Text style={styles.name}>{article.title}</Text>
    </View>
    <Text style={styles.description}>{article.description}</Text>
  </View>
)

//TODO: secure this
const API_KEY = "c069630adc5c4fd893156917b7da614d"

type SourceProps = {
  id: string
  name: string
}
type NewsProps = {
  content: string
  publishedAt: string
  source: SourceProps
} & ArticleProps

function App(): JSX.Element {  
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    //todo: preload headlines
    search("test")
  }, [])

  function search(query: string) {
    fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        const filteredData = data.articles.map((item: NewsProps) => {
          const {content, publishedAt, source, ...article} = item
          article.publisherName = source.name
          return article
        })
        setData(filteredData)
      })
  }


  return (
    <SafeAreaView style={styles.background}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={styles.background.backgroundColor}
      />
      {/*<Search/>*/}
      {
        !data ? 
          <ActivityIndicator size="large"/>
        :
          <FlatList
            data={data}
            style={styles.list}
            renderItem={({item}: ListRenderItemInfo<ArticleProps>) => 
              <Article {...item}/>
            }
          />
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "white"
  },
  item: {
    backgroundColor: 'white',
    marginVertical: 5
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  list: {
    marginTop: 40
  },
  name: {
    fontSize: 20,
    fontWeight: '300',
    color: "black"
  },
  description: {
    fontSize: 16,
    color: "darkgrey",
    fontWeight: '200'
  }
})

export default App
