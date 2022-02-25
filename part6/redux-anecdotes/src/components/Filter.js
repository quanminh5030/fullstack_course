import { connect } from "react-redux"
import { filterList } from "../reducers/filterReducer"

const Filter = (props) => {

  const handleChange = (event) => {
    const input = event.target.value
    props.filterList(input)
  }
  const style = {
    marginBottom: 10
  }
  
  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  filterList
}

export default connect(null, mapDispatchToProps)(Filter)