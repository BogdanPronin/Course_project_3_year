import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../SubmitForm/SubmitForm.css'

interface FormData {
  name: string;
  email: string;
  phone: string;
  comment: string;
  file: File | null;
}

const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    comment: '',
    file: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement; // Use type assertion to specify the event target as an HTMLInputElement
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) data.append(key, value);
    });

    try {
      const response = await fetch('http://localhost:3001/api/submit-form', {
        method: 'POST',
        body: data,
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Form submitted successfully');
      // Очистка формы после отправки
      setFormData({
        name: '',
        email: '',
        phone: '',
        comment: '',
        file: null,
      });
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  return (
    <div id="about" className='submitForm_container_wrapper'>
      <div className='submitForm_container'>
        <h1 className='submitForm_header'>
          Создайте свою уникальную вывеску
        </h1>
        <div className='submitForm_text'>Если вам не подошла ни одна из наших готовых вывесок, можете заказать свою вывеску с вашим дизайном. Мы сделаем всё, чтобы воплотить вашу идею</div>
        <form className='submitForm_form' onSubmit={handleSubmit}>
          <input className='submitForm_text_input'
            type="text"
            name="name"
            placeholder="Имя"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input className='submitForm_text_input'
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input className='submitForm_text_input'
            type="tel"
            name="phone"
            placeholder="Телефон"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <textarea 
            name="comment"
            placeholder="Расскажите какую вывеску вы хотите видеть? Опишите детали заказа (цвет/ размер)"
            value={formData.comment}
            onChange={handleChange as any} // Приведение типа для совместимости с event типом
            required
          />
          <div>
          <input className='submitForm_file_input'
            type="file"
            name="file"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.files) {
                setFormData({ ...formData, file: e.target.files[0] });
              }
            }}
          />
          </div>
          <button className="submitForm_button" type="submit">Отправить</button>
        </form>
      </div>
    </div>
  );
};

export default Form;
