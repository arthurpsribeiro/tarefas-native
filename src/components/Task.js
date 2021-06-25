import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import moment from "moment";
import "moment/locale/pt-br";
import Icon from "react-native-vector-icons/FontAwesome";

export default (props) => {
	const TODAY = moment(props.estimateAt)
		.locale("pt-br")
		.format("ddd, D [de] MMMM");
	const formatatedDate = moment;

	function getCheckView(doneAt) {
		if (doneAt) {
			return (
				<View style={styles.done}>
					<Icon name="check" size={20} color="#fff" />
				</View>
			);
		}
		return <View style={styles.pending}></View>;
	}

	return (
		<View style={styles.container}>
			<TouchableWithoutFeedback>
				<View style={styles.checkContainer}>{getCheckView(props.doneAt)}</View>
			</TouchableWithoutFeedback>
			<View>
				<Text style={styles.desc}>{props.desc}</Text>
				<Text style={styles.date}>{TODAY}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		borderColor: "#aaa",
		borderBottomWidth: 1,
		alignItems: "center",
		padding: 10,
		backgroundColor: "#fff",
	},
	checkContainer: {
		width: "20%",
		alignItems: "center",
		justifyContent: "center",
	},
	pending: {
		height: 25,
		width: 25,
		borderRadius: 13,
		borderWidth: 1,
		borderColor: "#555",
		alignItems: "center",
		justifyContent: "center",
	},
	done: {
		height: 25,
		width: 25,
		borderRadius: 13,
		backgroundColor: "#4d7031",
		alignItems: "center",
		justifyContent: "center",
	},
});
