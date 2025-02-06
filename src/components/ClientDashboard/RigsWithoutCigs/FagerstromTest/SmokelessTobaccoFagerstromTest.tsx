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
  SmokelessTobaccoFagerstromTestForm,
  smokelessTobaccoFagerstromTestFormValidator,
} from "@/types/FagerstromTestForm/SmokelessTobaccoFagerstromTestForm";

export default function SmokelessTobaccoFagerstromTest(): ReactNode {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SmokelessTobaccoFagerstromTestForm>({
    resolver: zodResolver(smokelessTobaccoFagerstromTestFormValidator),
    defaultValues: {
      firstDip: -1,
      intentionallySwallow: -1,
      whichGiveUpHate: -1,
      dipPerWeek: -1,
      frequentlyInMorning: -1,
      dipWhenSickInBed: -1,
    },
  });

  const onSubmit = (data: SmokelessTobaccoFagerstromTestForm): void => {
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
        <FormControl error={!!errors.firstDip?.message} sx={{ width: "100%" }}>
          <FormLabel>
            How soon after you wake up do you place your first dip?
          </FormLabel>
          <Controller
            name="firstDip"
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
                <FormControlLabel
                  value="0"
                  control={<Radio />}
                  label="After 60 minutes"
                />
              </RadioGroup>
            )}
          />
          <FormHelperText sx={{ m: 0 }}>
            {errors.firstDip?.message}
          </FormHelperText>
        </FormControl>

        <FormControl
          error={!!errors.intentionallySwallow?.message}
          sx={{ width: "100%" }}
        >
          <FormLabel>
            How often do you intentionally swallow tobacco juice?
          </FormLabel>
          <Controller
            name="intentionallySwallow"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                value={field.value.toString()}
                onChange={(e) => field.onChange(Number(e.target.value))}
              >
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="Always"
                />
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Sometimes"
                />
                <FormControlLabel value="0" control={<Radio />} label="Never" />
              </RadioGroup>
            )}
          />
          <FormHelperText sx={{ m: 0 }}>
            {errors.intentionallySwallow?.message}
          </FormHelperText>
        </FormControl>

        <FormControl
          error={!!errors.whichGiveUpHate?.message}
          sx={{ width: "100%" }}
        >
          <FormLabel>Which chew would you hate to give up?</FormLabel>
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
          error={!!errors.dipPerWeek?.message}
          sx={{ width: "100%" }}
        >
          <FormLabel>How many cans/pouches per week do you use</FormLabel>
          <Controller
            name="dipPerWeek"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                value={field.value.toString()}
                onChange={(e) => field.onChange(Number(e.target.value))}
              >
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="More than 3"
                />
                <FormControlLabel value="1" control={<Radio />} label="2-3" />
                <FormControlLabel value="0" control={<Radio />} label="0" />
              </RadioGroup>
            )}
          />
          <FormHelperText sx={{ m: 0 }}>
            {errors.dipPerWeek?.message}
          </FormHelperText>
        </FormControl>

        <FormControl
          error={!!errors.frequentlyInMorning?.message}
          sx={{ width: "100%" }}
        >
          <FormLabel>Do you chew more frequently in the morning?</FormLabel>
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
          error={!!errors.dipWhenSickInBed?.message}
          sx={{ width: "100%" }}
        >
          <FormLabel>
            Do you chew even if you are sick in bed most of the day?
          </FormLabel>
          <Controller
            name="dipWhenSickInBed"
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
            {errors.dipWhenSickInBed?.message}
          </FormHelperText>
        </FormControl>
      </Box>
    </form>
  );
}
