import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Input, Modal } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import SocialMediaLinks from "./socialmedia/SocialMedia";
import ContactSchema from "../../schema/contactSchema";
import { FormValues } from "../../types/GlobalType";
import { useMutation } from "@apollo/client";
import { SEND_EMAIL } from "../../graphql/queries";
import { toast } from "react-toastify";

const ContactPage: React.FC = () => {

  const [isModalOpen, setisModalOpen] = useState(false)
  const [succesMessage, setSuccesMessage] = useState("")
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(ContactSchema),
  });
  const [sendEmail, {loading}] = useMutation(SEND_EMAIL); 
  const onSubmit = async (data: FormValues) => {
  
    try {
      const response = await sendEmail({
        variables: data
      });
      reset();
      setValue("message", "");
      setisModalOpen(true)
      setSuccesMessage(response.data?.sendEmail)

    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Mesaj göndərərkən xəta baş verdi");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:p-6 lg:p-12">
      {/* Contact Form */}
      <Card className="flex-1 shadow-lg" title="Mənimlə əlaqə" bordered={false}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium">Adınız</label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  className={`w-full p-3 border rounded  outline-none  ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Adınızı qeyd edin"
                />
              )}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  className={`w-full p-3 border rounded  outline-none ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Emailinizi qeyd edin"
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Mesaj</label>
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  className={`w-full p-3 border  outline-none resize-none rounded min-h-[180px] max-h-[180px] ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Mesajını buraya yaz"
                  rows={5}
                />
              )}
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded shadow-md"
          >
          {loading ?  " Mesaj göndər..." : " Mesaj göndər"} 
          </button>
        </form>
      </Card>

      {/* Contact Details */}
      <Card
        className="flex-1 shadow-lg"
        title="Əlaqə məlumatı"
        bordered={false}
      >
        <div className="space-y-4">
          <p>
            <MailOutlined className="mr-2 text-lg" />
            Email:{" "}
            <a
              href="mailto:hsnlimurad540@gmail.com"
              className="text-blue-600 hover:underline"
            >
              hsnlimurad540@gmail.com
            </a>
          </p>
          <p>
            <PhoneOutlined className="mr-2 text-lg" />
            Telefon: 051-446-44-42
          </p>
          <p>Məni buradan izlə:</p>
          <SocialMediaLinks />
        </div>
        <img src="./images/social.svg" alt="Social" />
      </Card>
      <Modal
        title="Uğurlu"
        open={isModalOpen}
        onOk={() => setisModalOpen(false)}
        onCancel={() => setisModalOpen(false)}
        footer={null}
      >
        <h3 className="text-green-700">{succesMessage}</h3>
      </Modal>
    </div>
  );
};
export default ContactPage;
