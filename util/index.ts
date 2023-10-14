export const unique = (arr: string[]) => {
  return arr.filter((value, index, self) => self.indexOf(value) === index);
};
export const equalArray = (arr1: string[], arr2: string[]) => {
  if (unique(arr1).length !== unique(arr2).length) {
    return false;
  } else {
    return (
      arr1.filter((x) => !arr2.includes(x)).length ===
        arr2.filter((x) => !arr1.includes(x)).length &&
      arr2.filter((x) => !arr1.includes(x)).length === 0
    );
  }
};

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
