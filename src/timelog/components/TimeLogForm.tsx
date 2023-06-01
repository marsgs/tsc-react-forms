import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  title: z
    .string()
    .min(3, { message: "Title should be at least 3 characters" })
    .max(20),
  description: z
    .string()
    .min(3, { message: "Description should be at least 3 characters" })
    .max(50),
  hours: z.number({ invalid_type_error: "Hours required" }).min(0).max(24),
  minutes: z.number({ invalid_type_error: "Minutes required" }).min(0).max(59),
});

type TimeLogFormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: TimeLogFormData) => void;
}
const TimeLogForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TimeLogFormData>({ resolver: zodResolver(schema) });
  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <h2>Time Log</h2>
      <div className="form">
        <div className="left-form-content">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              {...register("title")}
              id="title"
              type="text"
              className="form-control"
            />
            {errors.title && (
              <p className="text-danger">{errors.title.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              {...register("description")}
              id="description"
              type="text"
              className="form-control"
            />
            {errors.description && (
              <p className="text-danger">{errors.description.message}</p>
            )}
          </div>
        </div>

        <div className="right-form-content">
          <div className="mb-3">
            <label htmlFor="hours" className="form-label">
              Hours
            </label>
            <input
              {...register("hours", { valueAsNumber: true })}
              id="hours"
              type="number"
              className="form-control"
            />
            {errors.hours && (
              <p className="text-danger">{errors.hours.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="minutes" className="form-label">
              Minutes
            </label>
            <input
              {...register("minutes", { valueAsNumber: true })}
              id="minutes"
              type="number"
              className="form-control"
            />
            {errors.minutes && (
              <p className="text-danger">{errors.minutes.message}</p>
            )}
          </div>
        </div>
      </div>
      <button className="mb-3 btn btn-outline-dark" type="submit">
        Submit
      </button>
    </form>
  );
};

export default TimeLogForm;
