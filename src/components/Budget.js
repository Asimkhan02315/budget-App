import { useForm } from "react-hook-form";
import axios from 'axios';
import { useState } from "react";

const Budget = (props) => {


  // const [formDisplay, setFormDisplay] = useState('none')

  const [status, setStatus] = useState('')

  const { register, formState: { errors }, reset, handleSubmit } = useForm();

  const onSubmit = (data) => {

    console.log(data);

    axios.post(`http://localhost:5000/income`, {
      id: new Date().getTime(),
      type: status,
      amount: data.amount,
      date: data.date
    }).then((res) => {
      console.log(res.data);
      props.setRefresh(!props.refresh)
      reset()
    })
  }

  return (
    <>

      <div className='container mt-3 d-flex justify-content-center '>
        {/* <span>
          <button onClick={() => {
            setFormDisplay(formDisplay === "none" ? 'block' : 'none')
            setStatus('income')
          }}

            className='mx-5 my-5 btn btn-primary'>Add Income</button>
        </span>

        <span>
          <button onClick={() => {
            setFormDisplay(formDisplay === "none" ? 'block' : 'none')
            setStatus('outcome')
          }} className='mx-5 my-5 btn btn-primary '>Add Outcome</button>
        </span> */}
      </div>



      <button onClick={() => { setStatus('income') }} type="button" className="btn btn-primary mx-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Income
      </button>

      <button onClick={() => { setStatus('outcome') }} type="button" className="btn btn-primary mx-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Outcome
      </button>
      <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{status} Modal</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <label>{status} Source:</label>
              <div className='form-group'>
                <input value={status}
                  type='text' {...register("type", { required: true })}

                  aria-invalid={errors.income ? "true" : "false"} />
              </div><br />

              <label>Amount:</label>
              <div className='form-group'>
                <input type='text' {...register("amount", { required: true })}
                  aria-invalid={errors.amount ? "true" : "false"} />
              </div><br />

              <label>Date:</label>
              <div className='form-group'>
                <input type='date' {...register("date", { required: true })}
                  aria-invalid={errors.date ? "true" : "false"} />
              </div><br />

              {/* <input className='btn btn-primary'  value='Add' /> */}
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" onClick={handleSubmit(onSubmit)} className="btn btn-primary" data-bs-dismiss="modal">Save</button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Budget