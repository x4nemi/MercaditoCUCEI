import { View, Text } from "react-native";
import React from "react";
import { SearchBar } from "react-native-elements";

export default class BuscarBar extends React.Component {
  state = {
    search: "",
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <View style={{ marginTop: 15 }}>
        <SearchBar
          placeholder="Buscar producto"
          onChangeText={this.updateSearch}
          value={search}
          platform="ios"
          // containerStyle={{
          //   backgroundColor: "white",
          //   borderColor: "white",
          // }}
          // inputContainerStyle={{
          //   backgroundColor: "#eee",
          //   borderRadius: 21,
          // }}
        />
      </View>
    );
  }
}

// export default function BuscarBar() {
//   // state = {
//   //   search: "",
//   // };
//   // updateSearch = (search) => {
//   //   this.setState({ search });
//   // };
//   // const { search } = this.state;

//   return (
//     <View style={{ marginTop: 15, backgroundColor: "white" }}>
//       <SearchBar
//         placeholder="Buscar"
//         platform="ios"
//         // onChangeText={this.updateSearch}
//         // value={search}
//         containerStyle={{
//           backgroundColor: "white",
//           borderColor: "white",
//         }}
//         inputContainerStyle={{
//           backgroundColor: "#eee",
//           borderRadius: 21,
//         }}
//       />
//     </View>
//   );
// }
