import { View, Text, TextInput, StyleSheet } from "react-native";

function Input({ label, style, textInputConfig, value, editable }) {
	let inputStyles = [styles.input];

	if (textInputConfig && textInputConfig.multiline) {
		inputStyles.push(styles.inputMultiline);
	}

	return (
		<View style={[styles.inputContainer, style]}>
			<Text style={styles.label}>{label}</Text>
			<TextInput
				style={inputStyles}
				{...textInputConfig}
				editable={editable}
				value={value}
			/>
		</View>
	);
}

export default Input;

const styles = StyleSheet.create({
	inputContainer: {
		marginHorizontal: 4,
		marginVertical: 12,
	},
	label: {
		fontSize: 16,
		color: "blue",
		marginBottom: 4,
	},
	input: {
		backgroundColor: "white",
		borderColor: "black",
		borderWidth: 1,
		padding: 6,
		borderRadius: 6,
		fontSize: 18,
		color: "black",
	},
	inputMultiline: {
		textAlignVertical: "top",
	},
});
