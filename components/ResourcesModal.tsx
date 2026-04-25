"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, PlayCircle, ExternalLink, MonitorPlay } from "lucide-react";

interface Resource {
  title: string;
  url: string;
  source: string;
}

const BIBLIOGRAPHY: Resource[] = [
  { title: "Prevención y detección precoz del cáncer de mama en atención primaria", source: "Dialnet", url: "https://dialnet.unirioja.es/servlet/articulo?codigo=9421446" },
  { title: "Cáncer de mama", source: "OPS/OMS", url: "https://www.paho.org/es/temas/cancer-mama" },
  { title: "Conocimientos, actitudes y prácticas para la detección temprana", source: "Revista Facultad Nacional de Salud Pública", url: "https://www.redalyc.org/journal/120/12062839002/html/" },
  { title: "Importancia del autoexamen de mamas", source: "MediSur", url: "http://scielo.sld.cu/scielo.php?script=sci_abstract&pid=S1727-897X2021000601037&lng=es&nrm=iso&tlng=es" },
];

const VIDEOS = [
  { title: "Prevención y diagnóstico precoz", id: "YaqGyI4JMp0", source: "Clínica Universidad de Navarra" },
  { title: "Cómo identificar señales de alerta", id: "p5DztNfi9Tk", source: "Las Américas TV" },
  { title: "Así se supera el cáncer de mama", id: "dSOH0BSwYDw", source: "Clínica Medellín SAS" },
];

export default function ResourcesModal({ isOpen, onClose, type }: { isOpen: boolean, onClose: () => void, type: "bib" | "vid" }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
          >
            <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-pink-50">
              <div className="flex items-center gap-3">
                {type === "bib" ? (
                  <>
                    <div className="p-2 bg-pink-100 rounded-lg text-pink-600">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold text-neutral-800">Bibliografía Recomendada</h2>
                  </>
                ) : (
                  <>
                    <div className="p-2 bg-red-100 rounded-lg text-red-600">
                      <PlayCircle className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold text-neutral-800">Vídeos Informativos</h2>
                  </>
                )}
              </div>
              <button onClick={onClose} className="p-2 hover:bg-neutral-200/50 rounded-full transition-colors text-neutral-400">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {type === "bib" ? (
                <div className="space-y-4">
                  {BIBLIOGRAPHY.map((item, idx) => (
                    <a 
                      key={idx} 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block p-4 rounded-2xl border border-neutral-100 hover:border-pink-200 hover:bg-pink-50/30 transition-all group"
                    >
                      <h3 className="font-bold text-neutral-800 mb-1 flex items-center justify-between gap-4">
                        {item.title}
                        <ExternalLink className="w-4 h-4 text-neutral-300 group-hover:text-pink-500 transition-colors flex-shrink-0" />
                      </h3>
                      <p className="text-sm text-neutral-500">{item.source}</p>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="space-y-8">
                  {VIDEOS.map((video, idx) => (
                    <div key={idx} className="space-y-3">
                      <div className="aspect-video w-full rounded-2xl overflow-hidden bg-neutral-100 shadow-sm">
                        <iframe
                          src={`https://www.youtube.com/embed/${video.id}`}
                          title={video.title}
                          className="w-full h-full"
                          allowFullScreen
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-neutral-800 flex items-center gap-2">
                          <MonitorPlay className="w-5 h-5 text-red-600" />
                          {video.title}
                        </h3>
                        <p className="text-sm text-neutral-500">{video.source}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 bg-neutral-50 text-center border-t border-neutral-100">
              <button onClick={onClose} className="text-sm font-bold text-pink-600 hover:text-pink-700">
                Entendido, cerrar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
