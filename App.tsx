
import React from 'react'
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  ListRenderItemInfo,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native'
import { processNewsResponse } from './News'
import { Article, ArticleProps } from './Article'
import { SearchBar } from './SearchBar'


//TODO: secure this
const API_KEY = "c069630adc5c4fd893156917b7da614d"


function App(): JSX.Element {  
  const [data, setData] = React.useState([])
  const [inputText, onChangeInputText] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  let flatListRef: FlatList<ArticleProps> | null = null

  //todo: preload top headlines with useEffect

  function search(query: string): void {
    if (query.length == 0) {
      // todo: show top headlines
      setIsLoading(false)
      Keyboard.dismiss()
      return
    }

    // todo: paging is broken on the API? Figure something out 
    fetch(`https://newsapi.org/v2/everything?pageSize=100&page=1&q=${query}&apiKey=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.articles) {
          const filteredData = processNewsResponse(data.articles)
          setData(filteredData)
          setErrorMessage('')
        }
        setIsLoading(false)
      })
      .catch((error) => {
        setData([])
        setErrorMessage(error.message)
        setIsLoading(false)
      })
  }

  function onSubmit() {
    setIsLoading(true)
    setData([])
    Keyboard.dismiss()
    search(inputText)
    if (flatListRef) {
      flatListRef.scrollToOffset({ animated: false, offset: 0 });
    }
  }


  return (
    <SafeAreaView style={styles.background}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={styles.background.backgroundColor}
      />
      <SearchBar 
        inputText={inputText}
        onChange={onChangeInputText}
        onSubmit={onSubmit}
      />
      {
        isLoading ? 
          <ActivityIndicator style={styles.indicator} size={'large'}/>
        : errorMessage.length > 0 ?
          <Text style={styles.error}>{errorMessage}</Text>
        : data.length == 0 ? 
          <Text style={styles.error}>Please Enter A Search Term</Text> 
        :
          <FlatList
            ref={(ref) => { flatListRef = ref }}
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
    flex: 1,
    backgroundColor: "white"
  },
  error: {
    fontSize: 12,
    fontWeight: '400',
    color: "black",
    marginTop: 50,
    textAlign: 'center'
  },
  list: {
    flex: 0.9
  },
  indicator: {
    marginTop: 50
  }
})

export default App
