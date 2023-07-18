import { Image, Linking, StyleSheet, Text, TouchableHighlight, View } from "react-native"

export type ArticleProps = {
    title: string
    publisherName?: string
    author: string
    description: string
    urlToImage: string
    url: string
  }
  
function onArticlePress(url: string) {
    // todo: open this with inline webview
    Linking.openURL(url)
}
  
export const Article = (article: ArticleProps) => (
    <TouchableHighlight onPress={() => onArticlePress(article.url)}>
        <View style={styles.item}>
            <View style={styles.header}>
                {
                    article.urlToImage ?
                        <Image 
                            source={{uri: article.urlToImage}}
                            style={styles.thumbnail}
                        />
                    :
                    <Image 
                        source={require("./assets/missing.png")}
                        style={styles.thumbnail}
                    />
                }
                <View style={styles.headerTextArea}>
                    <Text style={styles.title}>{article.title}</Text>
                    <Text style={styles.name}>{article.publisherName}</Text>
                    <Text style={styles.author}>{article.author}</Text>
                </View>
            </View>
            <Text style={styles.description}>{article.description}</Text>
        </View>
    </TouchableHighlight>
)

const styles = StyleSheet.create({
    item: {
      backgroundColor: 'white',
      paddingTop: 5,
      borderBottomColor: "lightgrey",
      borderBottomWidth: 1
    },
    header: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between"
    },
    headerTextArea: {
      marginLeft: 5,
      marginRight: 2,
      flex: 1
    },
    thumbnail: {
      width: 100
    },
    title: {
      fontSize: 12,
      fontWeight: '300',
      color: "black",
      flex: 1, 
      flexWrap: 'wrap',
      flexShrink: 1,
    },
    name: {
      fontSize: 8,
      fontWeight: '200',
      color: "darkgrey"
    },
    author: {
      fontSize: 6,
      fontWeight: '100',
      color: "darkgrey"
    },
    description: {
      fontSize: 8,
      color: "grey",
      fontWeight: '100'
    }
})