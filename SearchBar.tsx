import { Dispatch, SetStateAction } from "react";
import { Image, StyleSheet, TextInput, TouchableHighlight, View } from "react-native";

export type SearchProps = {
    inputText: string
    onChange: Dispatch<SetStateAction<string>>
    onSubmit: () => void
}

export const SearchBar = (searchProps: SearchProps) => (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.input}
        onChangeText={searchProps.onChange}
        onSubmitEditing={searchProps.onSubmit}
        value={searchProps.inputText}
      />
      <TouchableHighlight onPress={searchProps.onSubmit} underlayColor={"lightgrey"} style={styles.touchable}>
        <View style={styles.button}>
          <Image 
            source={require("./assets/search.png")}
            style={styles.icon}
          />
        </View>
      </TouchableHighlight>
    </View>
)

const styles = StyleSheet.create({
    searchBar: {
      flexDirection: "row",
      height: 30
    },
    input: {
      height: 30,
      flex: 1,
      backgroundColor: "white",
      borderColor: "darkgrey",
      borderWidth: 1,
      padding: 0
    },
    touchable: {
      backgroundColor: 'white',
    },
    button: {
      flex: 1,
      backgroundColor: "lightblue"
    },
    icon: {
      height: 30
    },
})
