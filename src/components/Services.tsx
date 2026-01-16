import React from 'react';
import { useContent } from '../hooks/useContent';
import { motion } from 'framer-motion';
import { brandConfig } from '../config/brand.config';
import { ContactCTA } from './ContactCTA';

export const Services: React.FC = () => {
  const content = useContent();
  const { services } = content;

  if (!services) return null;

  return (
    <>
    <section className="min-h-screen py-20 px-4 md:px-8 lg:px-16" style={{ backgroundColor: brandConfig.colors.primary.white, color: brandConfig.colors.primary.black }}>
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-4 font-display"
          style={{ color: brandConfig.colors.primary.black }}
        >
          {services.title}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12 italic border-l-4 pl-4 text-xl"
          style={{ 
            borderColor: brandConfig.colors.accent.red,
            color: brandConfig.colors.neutral.gray600
          }}
        >
          {/* {services.disclaimer} */}
        </motion.p>

        <div className="space-y-16">
          {services.sections.map((section: any, index: number) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border-t pt-8"
              style={{ borderColor: brandConfig.colors.neutral.gray200 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 font-display" style={{ color: brandConfig.colors.accent.red }}>
                {section.title}
              </h2>

              {/* Subsections (e.g. 1.1, 1.2) */}
              {section.subsections && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {section.subsections.map((sub: any, subIndex: number) => (
                    <div key={subIndex} className="p-6 rounded-lg border transition-colors hover:shadow-lg"
                      style={{ 
                        backgroundColor: brandConfig.colors.primary.white,
                        borderColor: brandConfig.colors.neutral.gray200,
                      }}
                    >
                      <h3 className="text-xl font-bold mb-2 font-display" style={{ color: brandConfig.colors.primary.black }}>{sub.title}</h3>
                      <p className="text-sm mb-4" style={{ color: brandConfig.colors.neutral.gray600 }}>{sub.description}</p>
                      
                      {sub.options && (
                        <ul className="space-y-3 mb-4">
                          {sub.options.map((opt: any, optIndex: number) => (
                            <li key={optIndex} className="p-3 rounded" style={{ backgroundColor: brandConfig.colors.neutral.gray100 }}>
                              <div className="flex justify-between items-start">
                                <span className="font-semibold" style={{ color: brandConfig.colors.primary.black }}>{opt.name}</span>
                                {opt.price && <span className="font-mono text-sm px-2 py-0.5 rounded text-white" style={{ backgroundColor: brandConfig.colors.accent.red }}>{opt.price}</span>}
                              </div>
                              <p className="text-sm mt-1" style={{ color: brandConfig.colors.neutral.gray600 }}>{opt.description}</p>
                            </li>
                          ))}
                        </ul>
                      )}
                      
                      {sub.note && (
                        <p className="text-xs italic mt-4 pt-4 border-t" style={{ color: brandConfig.colors.neutral.gray500, borderColor: brandConfig.colors.neutral.gray200 }}>
                          {sub.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Items (e.g. 2. Funcionalitats Addicionals) */}
              {section.items && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.items.map((item: any, itemIndex: number) => (
                    <div key={itemIndex} className="p-5 rounded-lg border" style={{ backgroundColor: brandConfig.colors.neutral.gray50, borderColor: brandConfig.colors.neutral.gray200 }}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-lg font-display" style={{ color: brandConfig.colors.primary.black }}>{item.name}</h4>
                        {item.price && <span className="text-xs font-mono px-2 py-1 rounded text-white" style={{ backgroundColor: brandConfig.colors.accent.red }}>{item.price}</span>}
                      </div>
                      {item.description && <p className="text-sm" style={{ color: brandConfig.colors.neutral.gray600 }}>{item.description}</p>}
                      {item.subOptions && (
                        <ul className="mt-2 space-y-1">
                          {item.subOptions.map((subOpt: string, sIndex: number) => (
                            <li key={sIndex} className="text-sm" style={{ color: brandConfig.colors.neutral.gray500 }}>• {subOpt}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Simple List (e.g. 3. Serveis Complementaris) */}
              {section.simpleList && (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {section.simpleList.map((item: string, listIndex: number) => (
                    <li key={listIndex} className="flex items-center" style={{ color: brandConfig.colors.neutral.gray700 }}>
                      <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: brandConfig.colors.accent.red }}></span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {section.note && (
                <p className="mt-6 text-sm italic" style={{ color: brandConfig.colors.neutral.gray500 }}>
                  {section.note}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    <ContactCTA />
    </>
  );
};
