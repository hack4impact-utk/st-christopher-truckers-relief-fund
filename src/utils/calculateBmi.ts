export default function calculateBmi(
  heightFeet: number,
  heightInches: number,
  weight: number,
) {
  if (heightFeet == 0 || heightInches == 0 || weight == 0) {
    return 0;
  }

  const totalInches = heightFeet * 12 + heightInches;

  return (703 * weight) / totalInches ** 2;
}
