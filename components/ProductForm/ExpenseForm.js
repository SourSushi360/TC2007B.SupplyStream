import { StyleSheet, View } from "react-native";
import Input from "./Input";

function ExpenseForm() {
	function amountChangeHandler() {
		console.log("Amount Changed");
	}

	return (
		<View>
			<View style={styles.inputsRow}>
				<Input
					style={styles.rowInput}
					label={"Amount"}
					textInputConfig={{
						keyboardType: "decimal-pad",
						onChangeText: amountChangeHandler,
					}}
				/>
				<Input
					style={style.rowInput}
					label={"Date"}
					textInputConfig={{
						placeholder: "YYYY-MM-DD",
						keyboardType: "number-pad",
						maxLength: 10,
						onChangeText: () => {
							console.log("Date Changed");
						},
					}}
				/>
			</View>
			<Input
				label={"Description"}
				textInputConfig={{
					multiline: true,
					// autocorrect: false,
					// autoCapitalize: "none",
				}}
			/>
		</View>
	);
}

export default ExpenseForm;

const styles = StyleSheet.create({
	inputsRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	rowInput: {
		flex: 1,
	},
});
