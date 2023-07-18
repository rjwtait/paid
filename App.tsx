
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

  let flatListRef: FlatList<ArticleProps> | null = null

  //todo: preload top headlines with useEffect

  function search(query: string): void {
    if (query.length == 0) {
      // todo: show top headlines
      Keyboard.dismiss()
      return
    }

    // todo: add paging fetch(`https://newsapi.org/v2/everything?pageSize=50&page=1&q=${query}&apiKey=${API_KEY}`)
    fetch(`https://newsapi.org/v2/everything?&q=${query}&apiKey=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.articles) {
          const filteredData = processNewsResponse(data.articles)
          setData(filteredData)
          setErrorMessage('')
          // TODO scroll to top of list
        }
      })
      .catch((error) => {
        setData([])
        setErrorMessage(error.message)
      })
  }

  function onSubmit() {
    // show a loading spinner while waiting for response
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
        data.length == 0 ? 
          errorMessage.length > 0 ?
            <Text style={styles.error}>{errorMessage}</Text>
          : inputText.length > 0 ?
            <ActivityIndicator style={styles.indicator} size={'large'}/>
          :
            <Text style={styles.error}>Please Enter A Search Term</Text> 
        :
          // todo: handle large list size
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
