import { useState } from 'react';
import { motion } from 'framer-motion';
import {Mail,Phone,Upload,Send,Linkedin,Plus,Trash2,Github,Globe,Twitter,Instagram,Facebook,Youtube,Twitch,Gitlab,Dribbble,Figma,Briefcase,Code,} from 'lucide-react';
import { brandConfig } from '../config/brand.config';
import { contactConfig } from '../config/contact.config';
import { useContent } from '../hooks/useContent';

export function ContactForm() {
  const content = useContent();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    role: '',
    customRole: '',
    links: [''],
    message: '',
  });

  const handleLinkChange = (index: number, value: string) => {
    const newLinks = [...formState.links];
    newLinks[index] = value;
    setFormState({ ...formState, links: newLinks });
  };

  const addLink = () => {
    setFormState({ ...formState, links: [...formState.links, ''] });
  };

  const removeLink = (index: number) => {
    const newLinks = formState.links.filter((_, i) => i !== index);
    setFormState({ ...formState, links: newLinks });
  };

  const iconMatchers: { regex: RegExp; Icon: any }[] = [
    { regex: /linkedin/i, Icon: Linkedin },
    { regex: /github/i, Icon: Github },
    { regex: /(twitter|x\.com)/i, Icon: Twitter },
    { regex: /instagram/i, Icon: Instagram },
    { regex: /facebook/i, Icon: Facebook },
    { regex: /youtube/i, Icon: Youtube },
    { regex: /twitch/i, Icon: Twitch },
    { regex: /gitlab/i, Icon: Gitlab },
    { regex: /dribbble/i, Icon: Dribbble },
    { regex: /figma/i, Icon: Figma },
    { regex: /infojobs/i, Icon: Briefcase },
    { regex: /stackoverflow/i, Icon: Code },
  ];

  function LinkIcon({ url }: { url: string }) {
    if (!url) return <Globe className="h-5 w-5 text-gray-400" />;

    let host = url;
    try {
      host = new URL(url).hostname.toLowerCase();
    } catch {
      host = url.toLowerCase();
    }

    const match = iconMatchers.find((m) => m.regex.test(host));
    const Icon = match ? match.Icon : Globe;
    return <Icon className="h-5 w-5 text-gray-400" />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formState);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      className="py-20 w-full"
      style={{
        backgroundColor: brandConfig.colors.primary.white,
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              {content.joinUs.form.title}
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              {content.joinUs.form.description}
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-100 rounded-full">
                  <Mail className="w-6 h-6 text-gray-800" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-mono uppercase tracking-wider">
                    {content.joinUs.form.emailLabel}
                  </p>
                  <a
                    href={`mailto:${contactConfig.email}`}
                    className="text-lg font-medium hover:underline"
                  >
                    {contactConfig.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-100 rounded-full">
                  <Phone className="w-6 h-6 text-gray-800" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-mono uppercase tracking-wider">
                    {content.joinUs.form.phoneLabel}
                  </p>
                  <a
                    href={`tel:${contactConfig.phone.replace(/\s/g, '')}`}
                    className="text-lg font-medium hover:underline"
                  >
                    {contactConfig.phone}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Application Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {content.joinUs.form.nameLabel}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formState.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none bg-gray-50"
                  placeholder={content.joinUs.form.namePlaceholder}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {content.joinUs.form.emailLabel}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none bg-gray-50"
                  placeholder={content.joinUs.form.emailPlaceholder}
                />
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {content.joinUs.form.roleLabel}
                </label>
                <div className="relative">
                  <select
                    id="role"
                    name="role"
                    required
                    value={formState.role}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none bg-gray-50 appearance-none"
                  >
                    <option value="" disabled>
                      {content.joinUs.form.rolePlaceholder}
                    </option>
                    <option value="frontend">
                      {content.joinUs.form.roles.frontend}
                    </option>
                    <option value="backend">
                      {content.joinUs.form.roles.backend}
                    </option>
                    <option value="fullstack">
                      {content.joinUs.form.roles.fullstack}
                    </option>
                    <option value="uiux">
                      {content.joinUs.form.roles.uiux}
                    </option>
                    <option value="pm">{content.joinUs.form.roles.pm}</option>
                    <option value="marketing">
                      {content.joinUs.form.roles.marketing}
                    </option>
                    <option value="other">
                      {content.joinUs.form.roles.other}
                    </option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                {formState.role === 'other' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3"
                  >
                    <input
                      type="text"
                      name="customRole"
                      value={formState.customRole}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none bg-gray-50"
                      placeholder={content.joinUs.form.otherRolePlaceholder}
                      required
                    />
                  </motion.div>
                )}
              </div>

              <div>
                <label
                  htmlFor="links"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {content.joinUs.form.linksLabel}
                </label>
                <div className="space-y-3">
                  {formState.links.map((link, index) => (
                    <div key={index} className="relative flex gap-2">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <LinkIcon url={link} />
                        </div>
                        <input
                          type="url"
                          value={link}
                          onChange={(e) =>
                            handleLinkChange(index, e.target.value)
                          }
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none bg-gray-50"
                          placeholder={content.joinUs.form.linksPlaceholder}
                        />
                      </div>
                      {formState.links.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeLink(index)}
                          className="p-3 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title={content.joinUs.form.removeLink}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addLink}
                    className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition-colors px-1"
                  >
                    <Plus className="w-4 h-4" />
                    {content.joinUs.form.addLink}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="cv"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {content.joinUs.form.cvLabel}
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors cursor-pointer bg-gray-50">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-black hover:text-gray-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-black"
                      >
                        <span>{content.joinUs.form.uploadButton}</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept=".pdf"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">{content.joinUs.form.dragDrop}</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      {content.joinUs.form.fileLimit}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {content.joinUs.form.messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formState.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none bg-gray-50 resize-none"
                  placeholder={content.joinUs.form.messagePlaceholder}
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-black text-white py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <span>{content.joinUs.form.submitButton}</span>
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
