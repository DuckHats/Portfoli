import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { useLanguage } from '../hooks/useLanguage';
import { accessibilityConfig } from '../config/accessibility.config';

export const ContactForm: React.FC = () => {
  const content = useContent();
  const { language } = useLanguage();
  const { contact } = content;
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  if (!contact) return null;

  const a11y = accessibilityConfig.joinUs[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const formData = new FormData();
      formData.append('name', formState.name);
      formData.append('email', formState.email);
      formData.append('message', formState.message);

      const response = await fetch('/api/submit-contact', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputStyles = "w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none bg-gray-50";
  const labelStyles = "block text-sm font-medium text-gray-700 mb-2";

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label 
            htmlFor="name" 
            className={labelStyles}
          >
            {contact.form.nameLabel}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            placeholder={contact.form.namePlaceholder}
            required
            className={inputStyles}
            aria-label={a11y.nameFieldLabel}
          />
        </div>
        <div>
          <label 
            htmlFor="email" 
            className={labelStyles}
          >
            {contact.form.emailLabel}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            placeholder={contact.form.emailPlaceholder}
            required
            className={inputStyles}
            aria-label={a11y.emailFieldLabel}
          />
        </div>
      </div>

      <div>
        <label 
          htmlFor="message" 
          className={labelStyles}
        >
          {contact.form.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          value={formState.message}
          onChange={handleChange}
          placeholder={contact.form.messagePlaceholder}
          required
          rows={6}
          className={`${inputStyles} resize-none`}
          aria-label={a11y.messageFieldLabel}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full flex items-center justify-center gap-2 bg-black text-white py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={a11y.submitButtonLabel}
      >
        <span>{status === 'submitting' ? '...' : contact.form.submitButton}</span>
        <Send className="w-5 h-5" />
      </button>

      {status === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-100 text-green-800 border border-green-200 text-center font-medium rounded-lg"
        >
          {contact.form.successMessage}
        </motion.div>
      )}

      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-100 text-red-800 border border-red-200 text-center font-medium rounded-lg"
        >
          {contact.form.errorMessage}
        </motion.div>
      )}
    </form>
  );
};
