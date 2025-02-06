import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  CigaretteFagerstromTestForm,
  cigaretteFagerstromTestFormValidator,
} from "@/types/FagerstromTestForm/CigaretteFagerstromTestForm";

export default function CigaretteFagerstromTest(): ReactNode {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CigaretteFagerstromTestForm>({
    resolver: zodResolver(cigaretteFagerstromTestFormValidator),
    defaultValues: {
      firstCigarette: -1,
      refrainInForbiddenAreas: -1,
      whichGiveUpHate: -1,
      cigarettesPerDay: -1,
      frequentlyInMorning: -1,
      smokeWhenSickInBed: -1,
    },
  });

  const onSubmit = (data: CigaretteFagerstromTestForm): void => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          width: "min(90vw, 700px)",
          display: "grid",
          gap: 1.5,
          gridTemplateColumns: "1fr",
        }}
      >
        <FormControl
          error={!!errors.firstCigarette?.message}
          sx={{ width: "100%" }}
        >
          <FormLabel>
            How soon after waking do you smoke your first cigarette?
          </FormLabel>
          <Controller
            name="firstCigarette"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                value={field.value.toString()}
                onChange={(e) => field.onChange(Number(e.target.value))}
              >
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="Within 5 minutes"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="5-30 minutes"
                />
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="31-60 minutes"
                />
              </RadioGroup>
            )}
          />
          <FormHelperText sx={{ m: 0 }}>
            {errors.firstCigarette?.message}
          </FormHelperText>
        </FormControl>

        <FormControl
          error={!!errors.refrainInForbiddenAreas?.message}
          sx={{ width: "100%" }}
        >
          <FormLabel>
            Do you find it difficult to refrain from smoking in places where it
            is forbidden?
          </FormLabel>
          <Controller
            name="refrainInForbiddenAreas"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                value={field.value.toString()}
                onChange={(e) => field.onChange(Number(e.target.value))}
              >
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
                <FormControlLabel value="0" control={<Radio />} label="No" />
              </RadioGroup>
            )}
          />
          <FormHelperText sx={{ m: 0 }}>
            {errors.refrainInForbiddenAreas?.message}
          </FormHelperText>
        </FormControl>

        <FormControl
          error={!!errors.whichGiveUpHate?.message}
          sx={{ width: "100%" }}
        >
          <FormLabel>Which cigarette would you hate to give up?</FormLabel>
          <Controller
            name="whichGiveUpHate"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                value={field.value.toString()}
                onChange={(e) => field.onChange(Number(e.target.value))}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="The first one in the morning"
                />
                <FormControlLabel
                  value="0"
                  control={<Radio />}
                  label="All others"
                />
              </RadioGroup>
            )}
          />
          <FormHelperText sx={{ m: 0 }}>
            {errors.whichGiveUpHate?.message}
          </FormHelperText>
        </FormControl>

        <FormControl
          error={!!errors.cigarettesPerDay?.message}
          sx={{ width: "100%" }}
        >
          <FormLabel>How many cigarettes a day do you smoke?</FormLabel>
          <Controller
            name="cigarettesPerDay"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                value={field.value.toString()}
                onChange={(e) => field.onChange(Number(e.target.value))}
              >
                <FormControlLabel
                  value="0"
                  control={<Radio />}
                  label="10 or less"
                />
                <FormControlLabel value="1" control={<Radio />} label="11-20" />
                <FormControlLabel value="2" control={<Radio />} label="21-30" />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="31 or more"
                />
              </RadioGroup>
            )}
          />
          <FormHelperText sx={{ m: 0 }}>
            {errors.cigarettesPerDay?.message}
          </FormHelperText>
        </FormControl>

        <FormControl
          error={!!errors.frequentlyInMorning?.message}
          sx={{ width: "100%" }}
        >
          <FormLabel>Do you smoke more frequently in the morning?</FormLabel>
          <Controller
            name="frequentlyInMorning"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                value={field.value.toString()}
                onChange={(e) => field.onChange(Number(e.target.value))}
              >
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
                <FormControlLabel value="0" control={<Radio />} label="No" />
              </RadioGroup>
            )}
          />
          <FormHelperText sx={{ m: 0 }}>
            {errors.frequentlyInMorning?.message}
          </FormHelperText>
        </FormControl>

        <FormControl
          error={!!errors.smokeWhenSickInBed?.message}
          sx={{ width: "100%" }}
        >
          <FormLabel>
            Do you moke even if you are sick in bed most of the day?
          </FormLabel>
          <Controller
            name="smokeWhenSickInBed"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                value={field.value.toString()}
                onChange={(e) => field.onChange(Number(e.target.value))}
              >
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
                <FormControlLabel value="0" control={<Radio />} label="No" />
              </RadioGroup>
            )}
          />
          <FormHelperText sx={{ m: 0 }}>
            {errors.smokeWhenSickInBed?.message}
          </FormHelperText>
        </FormControl>
      </Box>
    </form>
  );
}
