import React, { Component } from "react";
import {
	View,
	Text,
	StyleSheet,
	ImageBackground,
	TouchableOpacity,
	Alert,
	FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Constants from "expo-constants";
import moment from "moment";
import "moment/locale/pt-br";
import AsyncStorage from "@react-native-async-storage/async-storage";

import commomStyles from "../commomStyles";
import todayImage from "../../assets/imgs/today.jpg";
import Task from "../components/Task";
import AddTask from "./AddTask";

const initialState = {
	showDoneTasks: true,
	showAddTask: false,
	visibleTasks: [],
	tasks: [],
};
export default class TaskList extends Component {
	state = { ...initialState };

	componentDidMount = async () => {};

	filterTasks = async () => {
		// await AsyncStorage.setItem("tasksState", JSON.stringify(this.state));
		// const stateString = await AsyncStorage.getItem("tasksState");
	};

	toggleFilter = () => {};

	addTask = (newTask) => {
		if (!newTask.desc || !newTask.desc.trim()) {
			Alert.alert("Dados inválidos", "Descrição não informada!");
		}

		let tasks = [...this.state.tasks];
		tasks.push({
			id: Math.random(),
			desc: newTask.desc,
			estimateAt: newTask.date,
			doneAt: null,
		});

		this.setState({ tasks, showAddTask: false }, this.filterTasks);
	};

	toggleTask = (taskId) => {};

	deleteTasl = (taskID) => {};

	render() {
		const TODAY = moment().locale("pt-br").format("LL");
		return (
			<View style={styles.container}>
				<AddTask
					isVisible={this.state.showAddTask}
					onSave={this.addTask}
					onCancel={() => {
						this.setState({ showAddTask: false });
					}}
				/>
				<ImageBackground source={todayImage} style={styles.background}>
					<View style={styles.iconBar}>
						<TouchableOpacity onPress={this.toggleFilter}>
							<Icon
								name={this.state.showDoneTasks ? "eye" : "eye-slash"}
								size={30}
								color={commomStyles.colors.secondary}
							/>
						</TouchableOpacity>
					</View>
					<View style={styles.titleBar}>
						<Text style={styles.title}>Hoje</Text>
						<Text style={styles.subtitle}>{TODAY}</Text>
					</View>
				</ImageBackground>
				<View style={styles.containerList}>
					<Task
						desc="Assistir Filme"
						estimateAt={new Date()}
						doneAt={new Date()}
					/>
					<FlatList
						data={this.state.tasks}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => <Task {...item} />}
					/>
				</View>
				<TouchableOpacity
					onPress={() => {
						this.setState({ showAddTask: true });
					}}
					style={styles.addButton}
				>
					<Icon name="plus" size={30} color={commomStyles.colors.secondary} />
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	background: {
		flex: 3,
	},
	containerList: {
		flex: 7,
	},
	iconBar: {
		flexDirection: "row",
		justifyContent: "flex-end",
		marginHorizontal: 30,
		marginTop: Constants.statusBarHeight,
	},
	titleBar: {
		flex: 1,
		justifyContent: "flex-end",
	},
	title: {
		color: commomStyles.colors.secondary,
		fontSize: 50,
		marginLeft: 20,
		marginBottom: 20,
	},
	subtitle: {
		color: commomStyles.colors.secondary,
		fontSize: 20,
		marginLeft: 20,
		marginBottom: 20,
	},
	addButton: {
		backgroundColor: commomStyles.colors.today,
		width: 80,
		height: 80,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		right: 30,
		bottom: 30,
		borderRadius: 40,
	},
});
