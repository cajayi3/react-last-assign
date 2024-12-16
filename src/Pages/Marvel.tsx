import { useForm } from "react-hook-form"
import  Button from "../../src/components/Button";
import React from "react";
import '../../src/css/marvel.css'
import { server_calls } from "../api/server";
import  Background  from '../assets/images/squad.jpg'
import { useDispatch, useStore } from "react-redux";
import { 
  chooseName,
  chooseHeight,
  chooseWeight, 
  chooseStrength,
  chooseVision, 
  chooseWeakness, 
  chooseAbility, 
  chooseOrigin 
} from "../../src/Redux/slices/RootSlice";

interface FormData {
  name: string;
  height: string;
  weight: string;
  strength: string;
  vision: string;
  weakness: string;
  ability: string;
  origin: string;
}

export interface IFormInputProps {
    id?: string[];
    onBackBtnClickHnd: () => void;
}


const FormInput: React.FC<IFormInputProps> = ({id, onBackBtnClickHnd }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const dispatch = useDispatch();
  const store = useStore();

  const onSubmit = async (data: FormData) => {
    console.log("Submitting form data:", data);
    console.log(`ID: ${typeof id}`);

    try {
    if ( id && id.length > 0) {
        await server_calls.update(id[0], data);
        console.log(`Updated: ${data.name} ${id[0]}`);
      } else {
        dispatch(chooseName(data.name));
        dispatch(chooseHeight(data.height));
        dispatch(chooseWeight(data.weight));
        dispatch(chooseStrength(data.strength));
        dispatch(chooseVision(data.vision));
        dispatch(chooseWeakness(data.weakness));
        dispatch(chooseAbility(data.ability));
        dispatch(chooseOrigin(data.origin));

        await server_calls.create(store.getState())
        console.log("Created new entry:", data);
        }
      } catch (error) {
        console.log('Error during submission:', error);
      }

    };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='squad' style={{ backgroundImage: `url(${ Background })`}} >
      <div className="name">
      <label htmlFor="name">Name</label>
      <input {...register("name")} name="name" placeholder="Name" />
      {errors.name && <p className="error-message">{errors.name.message}</p>}
      </div>
      <div className="height">
      <label htmlFor="height">Height</label>
      <input {...register("height")} name="height" placeholder="Height"/>
      {errors.height && <p className="error-message">{errors.height.message}</p>}
      </div>
      <div className="weight">
      <label htmlFor="weight">Weight</label>
      <input {...register("weight")} name="weight" placeholder="Weight"/>
      {errors.weight && <p className="error-message">{errors.weight.message}</p>}
      </div>
      <div className="strength">
      <label htmlFor="strength">Strength</label>
      <input {...register("strength")} name="strength" placeholder="Strength" />
      {errors.strength && <p className="error-message">{errors.strength.message}</p>}
      </div>
      <div className="vision">
      <label htmlFor="vision">Vision</label>
      <input {...register("vision")} name="vision" placeholder="Vision" />
      {errors.vision && <p className="error-message">{errors.vision.message}</p>}
      </div>
      <div className="weakness">
      <label htmlFor="weakness">Weakness</label>
      <input {...register("weakness")} name="weakness" placeholder="Weakness" />
      {errors.weakness && <p className="error-message">{errors.weakness.message}</p>}
      </div>
      <div className="ability">
      <label htmlFor="ability">Ability</label>
      <input {...register("ability")} name="ability" placeholder="Ability" />
      {errors.ability && <p className="error-message">{errors.ability.message}</p>}
      </div>
      <div className="origin">
      <label htmlFor="origin">Origin</label>
      <input {...register("origin")} name="origin" placeholder="Origin" />
      {errors.origin && <p className="error-message">{errors.origin.message}</p>}
      </div>
      <div className="back">
      <Button onClick={ onBackBtnClickHnd } title="Back">Back</Button>
      </div>
      <div>
        <Button type="submit" className="submitCar" title="Submit">Submit</Button>
      </div>
      </div>
    </form>
  )
};


export default FormInput;