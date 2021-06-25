import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import moment from "moment";
import "moment/locale/pt-br";
import Icon from "react-native-vector-icons/FontAwesome";
import commomStyles from "../commomStyles";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { TouchableOpacity } from "react-native-gesture-handler";

export default (props) => {
	const TODAY = moment(props.estimateAt)
		.locale("pt-br")
		.format("ddd, D [de] MMMM");

	const doneOrNotStyle = props.doneAt
		? { textDecorationLine: "line-through" }
		: {};

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

	const getRightContent = () => {
		return (
			<TouchableOpacity
				style={styles.right}
				onPress={() => console.warn("deletou direita")}
			>
				<Icon name="trash" size={30} color={"#fff"} />
			</TouchableOpacity>
		);
	};

	const getLeftContent = () => {
		return (
			<TouchableOpacity style={styles.left}>
				<Icon
					name="trash"
					size={30}
					color={"#fff"}
					style={styles.excludeIcon}
				/>
				<Text style={styles.excludeText}>Excluir</Text>
			</TouchableOpacity>
		);
	};

	return (
		<Swipeable
			renderRightActions={getRightContent}
			renderLeftActions={getLeftContent}
			onSwipeableLeftOpen={() => {
				console.warn("deletou esquerda");
			}}
			leftThreshold={150}
			// friction={2}
		>
			<View style={styles.container}>
				<TouchableWithoutFeedback>
					<View style={styles.checkContainer}>
						{getCheckView(props.doneAt)}
					</View>
				</TouchableWithoutFeedback>
				<View>
					<Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
					<Text style={styles.date}>{TODAY}</Text>
				</View>
			</View>
		</Swipeable>
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
	desc: {
		fontSize: 16,
		color: commomStyles.colors.mainText,
	},
	date: {
		color: commomStyles.colors.subText,
		fontSize: 12,
	},
	right: {
		backgroundColor: "tomato",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
		paddingHorizontal: 20,
		flex: 1,
	},
	left: {
		backgroundColor: "tomato",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
		paddingHorizontal: 20,
		flex: 1,
	},
	excludeIcon: {
		marginLeft: 10,
	},
	excludeText: {
		color: commomStyles.colors.secondary,
		fontSize: 20,
		margin: 10,
	},
});
