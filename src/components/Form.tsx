

const FormComponent = () => {
    

    return(
        <>
            

            <div className="body">
                <form >
                    <input type="text" name="name" placeholder="Contest Name Here..." />
                    <input type="text" name="category" placeholder="Contest Category Here..." />
                    <input type="text" name="description" placeholder="Contest Description Here..." />
                    <button type="submit">Submit</button>
                </form>
            </div>
            
            
        </>
    )
}
export default FormComponent;