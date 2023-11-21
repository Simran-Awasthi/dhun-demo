import React, { useEffect, useState } from "react";
import config from "../config";
import ky from "ky";
import PriceGraph from "../components/PriceGraph";

export type AmountConfigType = {
  min: {
    [key: string]: any;
  };
};
const AmountConfig: AmountConfigType = {
  min: {
    category_6: 99,
    category_7: 79,
    category_8: 59,
    category_9: 39,
    category_10: 19,
  },
};

const DashboardPage = () => {
  const [adminData, setAdminData] = useState<any>();

  const fetchAdminData = async () => {
    const user = JSON.parse(localStorage.getItem("user")!);
    if (user) {
      console.log(user);
      await ky.get(`${config.apiAdminBaseUrl}/${user.id}`).then(async (res) => {
        if (res.status === 200) {
          const data: any = await res.json();
          setAdminData(data.data);
          setFormData(data.data.amount);
          setChargeCustomers(data.data.charge_customers);
        }
      });
    }
  };

  const [charge_customers, setChargeCustomers] = useState<boolean>(false);

  const [formData, setFormData] = useState<{ [key: string]: number }>({
    category_6: 0,
    category_7: 0,
    category_8: 0,
    category_9: 0,
    category_10: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      return;
    }
    setFormData({
      ...formData,
      [e.target.name]: Number.parseInt(e.target.value),
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user")!);
    ky.put(`${config.apiAdminBaseUrl}/${user.id}`, {
      json: {
        amount: Object.assign(
          {},
          ...Object.keys(formData)
            .map((key) => {
              if (adminData.amount[key] !== formData[key]) {
                return {
                  [key]: formData[key],
                };
              }
            })
            .filter((item) => item)
        ),
      },
    })
      .then(async (res) => {
        const data: any = await res.json();
        console.log(data);
        await fetchAdminData();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const validateForm = () => {
    if (charge_customers) {
      return Object.keys(formData).every((key) => {
        return formData[key] >= AmountConfig.min[key];
      });
    } else {
      return true;
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  if (!adminData) {
    return <div>Loading ...</div>;
  }
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <p className="font-bold text-heading">
        {adminData.name}, {adminData.location} on Dhun Jam
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-field flex flex-col gap-6">
        <div className="w-full flex justify-between items-center gap-4">
          <p className="w-full max-w-content text-left">
            Do you want to charge your customers for requesting songs?
          </p>
          <fieldset
            id="charge_customers"
            className="w-full max-w-content flex items-center justify-center gap-4">
            <div className="flex gap-2 items-center">
              <input
                type="radio"
                id="yes"
                name="charge_customers"
                value="yes"
                defaultChecked={charge_customers}
                onChange={(e) => {
                  setChargeCustomers(e.target.checked);
                }}
                className="checked:bg-primary checked:hover:bg-primary checked:active:bg-primary checked:focus:bg-primary focus:bg-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <label htmlFor="yes">Yes</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="radio"
                id="no"
                name="charge_customers"
                value="no"
                defaultChecked={!charge_customers}
                onChange={(e) => {
                  setChargeCustomers(!e.target.checked);
                }}
                className="checked:bg-primary checked:hover:bg-primary checked:active:bg-primary checked:focus:bg-primary focus:bg-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <label htmlFor="no">no</label>
            </div>
          </fieldset>
        </div>
        <div className="w-full flex justify-between items-center gap-4">
          <p className="w-full max-w-content text-left">
            Custom song request amount-
          </p>
          <div className="w-full max-w-content flex items-center justify-center gap-4">
            <input
              disabled={!charge_customers}
              type="number"
              min={AmountConfig.min.category_6}
              required={charge_customers}
              className="w-full bg-transparent border-grayed focus:border-secondary border rounded-md focus:outline-none px-4 py-2 text-center disabled:bg-grayed disabled:bg-opacity-20"
              placeholder="Amount"
              name="category_6"
              defaultValue={formData.category_6}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="w-full flex justify-between items-center gap-4">
          <p className="w-full max-w-content text-left">
            Regular song request amounts, from high to low-
          </p>
          <div className="w-full max-w-content flex items-center justify-center gap-4">
            {Object.keys(formData)
              .filter((k) => k !== "category_6")
              .map((key) => {
                return (
                  <input
                    disabled={!charge_customers}
                    key={key}
                    type="number"
                    required={charge_customers}
                    min={AmountConfig.min[key]}
                    className="w-full bg-transparent border-grayed focus:border-secondary border rounded-md focus:outline-none px-2 py-1 disabled:bg-grayed disabled:bg-opacity-20"
                    placeholder="Amount"
                    name={key}
                    defaultValue={formData[key]}
                    onChange={handleInputChange}
                  />
                );
              })}
          </div>
        </div>
        {charge_customers && <PriceGraph data={formData} />}
        <button
          disabled={
            JSON.stringify(formData) === JSON.stringify(adminData.amount) ||
            !validateForm()
          }
          type="submit"
          className="w-full my-4 bg-primary text-white font-bold rounded-md py-2 px-4 disabled:bg-grayed disabled:bg-opacity-60">
          Save
        </button>
      </form>
    </div>
  );
};

export default DashboardPage;
