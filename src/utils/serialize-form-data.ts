export default function serializeFormData(formData: FormData) {
  const obj: { [key: string]: FormDataEntryValue } = {};
  formData.forEach((val, key) => {
    obj[key] = val;
  });
  return obj;
}
