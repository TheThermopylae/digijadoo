export default function () {
  let userData = useState('user-data', () => null)

  return { userData }
}
