import UpdateItem from '../components/UpdateItem'

const Sell = ({query}) => (
    <div>
        <UpdateItem id={query.id}/>
    </div>
)
// either destructure or do props.query.id (props) we have id exposed in all
export default Sell