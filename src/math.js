const calTip = (total, tipPercent = 0.25) => total + total * tipPercent;

const FtoC = temp => (temp - 32) / 1.8;

const CtoF = temp => temp * 1.8 + 32;

module.exports = {
	calTip,
	FtoC,
	CtoF
};
