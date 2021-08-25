import React, { useState } from "react";
import moment from "moment";
import { Inputs } from "@buffetjs/custom";
import { Table as Wapper } from "@buffetjs/styles";
import { Padded, Button, Flex } from "@buffetjs/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
const getCourseMonth = (date) => {
  if (!date) {
    return [];
  }

  const temp = moment(date);

  if (!temp?._isValid) {
    return [];
  }

  return temp.month();
};

function TakeCoursePayment({ course }) {
  const [state, setState] = useState({
    select: getCourseMonth(course?.meta.start),
    number: 0,
  });
  const handleChange = ({ target: { name, value } }) => {
    console.log(`state 11111`, state);
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const form = {
    select: {
      styleName: "col-6",
      description: "",
      label: "Month",
      type: "select",
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],

      value: "User",
    },
    number: {
      styleName: "col-6",
      description: "",
      label: "Amount",
      placeholder: "$",
      type: "number",
      validations: {
        required: true,
        max: 99,
      },
    },
  };

  return (
    <Wapper>
      <Padded top bottom right left size="md">
        <form onSubmit={() => {}}>
          <div className="row">
            {Object.keys(form).map((input) => (
              <div className={form[input].styleName} key={input}>
                <Inputs
                  name={input}
                  {...form[input]}
                  onChange={handleChange}
                  translatedErrors={{
                    date: "This is not a date",

                    number: "This is not a number",

                    max: "This is too high",
                    maxLength: "This is too long",
                    min: "This is too small",
                    minLength: "This is too short",
                    required: "This value is required",
                  }}
                  value={state[input] || form[input].value}
                />
              </div>
            ))}
          </div>
          <div className="row">
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <Button
                color="success"
                icon={<FontAwesomeIcon icon={faPlus} />}
                label="Save"
              />
            </div>
          </div>
        </form>
      </Padded>
    </Wapper>
  );
}

export default TakeCoursePayment;
