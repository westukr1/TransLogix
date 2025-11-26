import { Text, View } from "react-native";

export default function RequestsScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 22 }}>Екран "Мої заявки"</Text>
      <Text>Тут буде список заявок.</Text>
    </View>
  );
}
