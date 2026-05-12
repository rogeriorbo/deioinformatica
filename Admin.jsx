import React, { useState, useEffect } from 'react';
import { auth, signInWithGoogle, logout, db } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, doc, setDoc, deleteDoc, getDoc, getDocFromServer, getDocsFromServer } from 'firebase/firestore';
import { LogIn, LogOut, Plus, Trash2, Edit3, X, Save } from 'lucide-react';
import { handleFirestoreError, OperationType } from './firestoreUtils';

const AdminPanel = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const [items, setItems] = useState([]);
    const [aboutText, setAboutText] = useState("");
    const [settingsData, setSettingsData] = useState({ phone: '', email: '', location: '', facebook: '', instagram: '', linkedin: '', whatsapp: '' });
    
    // 'services', 'faqs', 'testimonials', 'about', 'settings'
    const [activeTab, setActiveTab] = useState('services');
    const [isSaving, setIsSaving] = useState(false);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (!currentUser) setLoading(false);
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (user && user.email === 'deiorbo@gmail.com') {
            fetchData(activeTab);
        } else if (user) {
            setLoading(false);
        }
    }, [user, activeTab]);

    const fetchData = async (tab) => {
        setLoading(true);
        try {
            if (tab === 'about') {
                const docRef = doc(db, 'content', 'about');
                let docSnap;
                try {
                    docSnap = await getDocFromServer(docRef);
                } catch (e) {
                    docSnap = await getDoc(docRef);
                }
                if (docSnap.exists()) {
                    setAboutText(docSnap.data().text);
                } else {
                    setAboutText("");
                }
            } else if (tab === 'settings') {
                const docRef = doc(db, 'content', 'settings');
                let docSnap;
                try {
                    docSnap = await getDocFromServer(docRef);
                } catch (e) {
                    docSnap = await getDoc(docRef);
                }
                if (docSnap.exists()) {
                    setSettingsData(docSnap.data());
                } else {
                    setSettingsData({
                        phone: "5521979776578",
                        email: "contato@deioinfo.com.br",
                        location: "Rio de Janeiro, RJ",
                        facebook: "https://facebook.com",
                        instagram: "https://instagram.com",
                        linkedin: "https://linkedin.com",
                        whatsapp: "https://wa.me/5521979776578"
                    });
                }
            } else {
                let querySnapshot;
                try {
                    querySnapshot = await getDocsFromServer(collection(db, tab));
                } catch (e) {
                    querySnapshot = await getDocs(collection(db, tab));
                }
                const loadedItems = [];
                querySnapshot.forEach((doc) => {
                    loadedItems.push({ id: doc.id, ...doc.data() });
                });
                loadedItems.sort((a, b) => (a.order || 0) - (b.order || 0));
                setItems(loadedItems);
            }
        } catch (error) {
            handleFirestoreError(error, OperationType.GET, tab, auth);
            console.error("Erro ao buscar dados:", error);
            alert("Erro ao carregar dados. Verifique o console.");
        }
        setLoading(false);
    };

    const handleSaveItem = async (updatedItem) => {
        setIsSaving(true);
        try {
            const itemRef = doc(db, activeTab, updatedItem.id);
            await setDoc(itemRef, updatedItem);
            fetchData(activeTab);
            alert("Salvo com sucesso!");
        } catch (error) {
            handleFirestoreError(error, OperationType.WRITE, activeTab, auth);
            console.error("Erro ao salvar:", error);
            alert("Erro ao salvar.");
        }
        setIsSaving(false);
    };

    const handleDeleteItem = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir?")) return;
        setIsSaving(true);
        try {
            await deleteDoc(doc(db, activeTab, id));
            fetchData(activeTab);
        } catch (error) {
            handleFirestoreError(error, OperationType.DELETE, activeTab, auth);
            console.error("Erro ao excluir:", error);
            alert("Erro ao excluir.");
        }
        setIsSaving(false);
    };

    const handleAddNew = () => {
        const newId = Date.now().toString();
        let newItem = { id: newId, order: items.length };
        if (activeTab === 'services') newItem = { ...newItem, title: "Novo Serviço", description: "Descrição...", icon: "computer" };
        if (activeTab === 'faqs') newItem = { ...newItem, question: "Nova Pergunta?", answer: "Resposta..." };
        if (activeTab === 'testimonials') newItem = { ...newItem, name: "Nome Cliente", title: "Cargo", quote: "Depoimento", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=388&auto=format&fit=crop" };
        
        setItems([...items, newItem]);
    };

    const saveAboutText = async () => {
        setIsSaving(true);
        try {
            await setDoc(doc(db, 'content', 'about'), { text: aboutText });
            alert("Texto salvo com sucesso!");
        } catch (e) {
            handleFirestoreError(e, OperationType.WRITE, 'content/about', auth);
            console.error("Erro ao salvar o texto sobre nós:", e);
            alert("Erro ao salvar.");
        }
        setIsSaving(false);
    };

    const saveSettingsData = async () => {
        setIsSaving(true);
        try {
            await setDoc(doc(db, 'content', 'settings'), settingsData);
            alert("Configurações salvas com sucesso!");
        } catch (e) {
            handleFirestoreError(e, OperationType.WRITE, 'content/settings', auth);
            console.error("Erro ao salvar configurações:", e);
            alert("Erro ao salvar.");
        }
        setIsSaving(false);
    };

    if (loading && !user) return <div className="min-h-screen bg-dark-bg text-white flex items-center justify-center">Carregando...</div>;

    if (!user) {
        return (
            <div className="min-h-screen bg-dark-bg text-white flex flex-col items-center justify-center p-6">
                <h1 className="text-3xl font-bold mb-8">Área Administrativa</h1>
                <p className="text-gray-400 mb-8 max-w-md text-center">Faça login com seu perfil de administrador para gerenciar o conteúdo do site.</p>
                <button 
                    onClick={signInWithGoogle}
                    className="flex items-center gap-3 bg-secondary hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                >
                    <LogIn className="w-5 h-5" />
                    Entrar com o Google
                </button>
                <div className="mt-8">
                    <a href="/" className="text-sm text-gray-400 hover:text-white underline">Voltar para o site</a>
                </div>
            </div>
        );
    }

    if (user.email !== 'deiorbo@gmail.com') {
         return (
            <div className="min-h-screen bg-dark-bg text-white flex flex-col items-center justify-center p-6">
                <h1 className="text-2xl font-bold mb-4 text-red-500">Acesso Negado</h1>
                <p className="text-gray-400 mb-8 text-center">{user.email} não tem permissões administrativas.</p>
                <button onClick={logout} className="bg-gray-800 px-6 py-2 rounded-lg hover:bg-gray-700">Sair</button>
            </div>
         );
    }

    return (
        <div className="min-h-screen bg-dark-bg text-white flex flex-col xl:flex-row">
            {/* Sidebar */}
            <div className="w-full xl:w-64 border-b xl:border-b-0 xl:border-r border-gray-800 p-6 flex flex-col">
                <h2 className="text-2xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Painel Admin</h2>
                <nav className="flex-1 space-y-2 flex flex-row xl:flex-col overflow-x-auto">
                    {[
                        { id: 'services', label: 'Serviços' },
                        { id: 'faqs', label: 'Perguntas (FAQ)' },
                        { id: 'testimonials', label: 'Depoimentos' },
                        { id: 'about', label: 'Sobre Nós' },
                        { id: 'settings', label: 'Contatos e Redes' }
                    ].map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`whitespace-nowrap flex-shrink-0 xl:w-full text-left px-4 py-3 rounded-lg transition-colors ${activeTab === tab.id ? 'bg-secondary text-white' : 'text-gray-400 hover:bg-gray-800'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
                <div className="mt-8 pt-6 border-t border-gray-800 hidden xl:block">
                    <div className="flex items-center gap-3 text-sm text-gray-400 mb-4 px-2">
                        <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden">
                            {user.photoURL && <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" />}
                        </div>
                        <div className="overflow-hidden">
                            <p className="truncate font-medium text-gray-300">{user.displayName}</p>
                        </div>
                    </div>
                    <button 
                        onClick={logout}
                        className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                        <LogOut className="w-4 h-4" />
                        Sair
                    </button>
                    <a href="/" className="block mt-4 text-center text-sm text-secondary hover:underline">Ir para o site principal</a>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-light-bg p-6 lg:p-10 overflow-y-auto w-full">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                        <h1 className="text-3xl font-bold">
                            Gerenciar {activeTab === 'services' ? 'Serviços' : activeTab === 'faqs' ? 'FAQ' : activeTab === 'about' ? 'Sobre Nós' : activeTab === 'settings' ? 'Contatos e Redes' : 'Depoimentos'}
                        </h1>
                        {(activeTab !== 'about' && activeTab !== 'settings') && (
                            <button 
                                onClick={handleAddNew}
                                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors font-medium cursor-pointer"
                            >
                                <Plus className="w-5 h-5" /> Adicionar Novo
                            </button>
                        )}
                    </div>
                    
                    {loading ? (
                        <div className="text-center py-20 text-gray-400">Carregando itens...</div>
                    ) : activeTab === 'about' ? (
                        <div className="bg-dark-bg border border-gray-800 rounded-xl p-8 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Texto da Seção Sobre Nós</label>
                                <textarea 
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-secondary min-h-[300px]"
                                    value={aboutText}
                                    onChange={(e) => setAboutText(e.target.value)}
                                    placeholder="Escreva sobre a empresa..."
                                />
                            </div>
                            <button 
                                onClick={saveAboutText}
                                disabled={isSaving}
                                className="flex items-center gap-2 bg-secondary hover:bg-orange-600 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors font-medium ml-auto"
                            >
                                <Save className="w-5 h-5" /> {isSaving ? "Salvando..." : "Salvar Texto"}
                            </button>
                        </div>
                    ) : activeTab === 'settings' ? (
                        <div className="bg-dark-bg border border-gray-800 rounded-xl p-8 space-y-6">
                            <h3 className="text-xl font-bold text-white border-b border-gray-800 pb-2">Informações de Contato</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Telefone / WhatsApp</label>
                                    <input type="text" className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-secondary" value={settingsData.phone} onChange={(e) => setSettingsData({...settingsData, phone: e.target.value})} placeholder="Ex: 5521979776578" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">E-mail de Suporte</label>
                                    <input type="email" className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-secondary" value={settingsData.email} onChange={(e) => setSettingsData({...settingsData, email: e.target.value})} placeholder="contato@..." />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Localização</label>
                                    <input type="text" className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-secondary" value={settingsData.location} onChange={(e) => setSettingsData({...settingsData, location: e.target.value})} placeholder="Ex: Rio de Janeiro, RJ" />
                                </div>
                            </div>
                            
                            <h3 className="text-xl font-bold text-white border-b border-gray-800 pb-2 pt-4">Redes Sociais</h3>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Link do Facebook</label>
                                    <input type="url" className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-secondary" value={settingsData.facebook} onChange={(e) => setSettingsData({...settingsData, facebook: e.target.value})} placeholder="https://..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Link do Instagram</label>
                                    <input type="url" className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-secondary" value={settingsData.instagram} onChange={(e) => setSettingsData({...settingsData, instagram: e.target.value})} placeholder="https://..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Link do LinkedIn</label>
                                    <input type="url" className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-secondary" value={settingsData.linkedin} onChange={(e) => setSettingsData({...settingsData, linkedin: e.target.value})} placeholder="https://..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Link do WhatsApp</label>
                                    <input type="url" className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-secondary" value={settingsData.whatsapp} onChange={(e) => setSettingsData({...settingsData, whatsapp: e.target.value})} placeholder="https://wa.me/..." />
                                </div>
                            </div>
                            
                            <button 
                                onClick={saveSettingsData}
                                disabled={isSaving}
                                className="flex items-center gap-2 bg-secondary hover:bg-orange-600 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors font-medium ml-auto"
                            >
                                <Save className="w-5 h-5" /> {isSaving ? "Salvando..." : "Salvar Configurações"}
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {items.length === 0 ? (
                                <div className="text-center py-20 text-gray-500 border border-dashed border-gray-700 rounded-xl">
                                    Nenhum item encontrado. Clique em "Adicionar Novo" para começar.
                                </div>
                            ) : (
                                items.map((item) => (
                                    <ItemEditor 
                                        key={item.id} 
                                        item={item} 
                                        type={activeTab} 
                                        onSave={handleSaveItem} 
                                        onDelete={() => handleDeleteItem(item.id)}
                                        isSaving={isSaving}
                                    />
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const ItemEditor = ({ item, type, onSave, onDelete, isSaving }) => {
    const [localItem, setLocalItem] = useState(item);

    const handleChange = (field, value) => {
        let typedValue = value;
        if (field === 'order') typedValue = parseInt(value, 10) || 0;
        setLocalItem({ ...localItem, [field]: typedValue });
    };

    return (
        <div className="bg-dark-bg border border-gray-800 rounded-xl p-6 relative group">
            <div className="absolute top-4 right-4 flex gap-2">
                <button 
                    onClick={() => onSave(localItem)}
                    disabled={isSaving}
                    className="p-2 flex items-center justify-center gap-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                    <Save className="w-4 h-4" /> Salvar
                </button>
                <button 
                    onClick={onDelete}
                    disabled={isSaving}
                    className="p-2 flex items-center justify-center gap-2 bg-red-600/20 text-red-500 rounded-lg hover:bg-red-600/30 transition-colors"
                    title="Excluir"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-32">
                <div className="col-span-1 md:col-span-2 flex items-center gap-4 mb-2">
                    <div className="w-20">
                        <label className="block text-xs font-medium text-gray-400 mb-1">Ordem (Posição)</label>
                        <input type="number" className="w-full bg-gray-800 border-none rounded-lg p-2 text-white text-sm focus:ring-1 focus:ring-secondary outline-none" value={localItem.order ?? 0} onChange={e => handleChange('order', e.target.value)} />
                    </div>
                </div>

                {type === 'services' && (
                    <>
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-xs font-medium text-gray-400 mb-1">Título</label>
                            <input type="text" className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-1 focus:ring-secondary outline-none" value={localItem.title || ""} onChange={e => handleChange('title', e.target.value)} />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-xs font-medium text-gray-400 mb-1">Descrição</label>
                            <textarea className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-1 focus:ring-secondary outline-none min-h-[80px]" value={localItem.description || ""} onChange={e => handleChange('description', e.target.value)} />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-xs font-medium text-gray-400 mb-1">Ícone</label>
                            <input type="text" className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-1 focus:ring-secondary outline-none" placeholder="Ex: computer, network, shield, support, cloud, server" value={localItem.icon || ""} onChange={e => handleChange('icon', e.target.value)} />
                            <p className="text-xs text-gray-500 mt-1">Nomes válidos: computer, network, shield, support, cloud, server</p>
                        </div>
                    </>
                )}

                {type === 'faqs' && (
                    <>
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-xs font-medium text-gray-400 mb-1">Pergunta</label>
                            <input type="text" className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-1 focus:ring-secondary outline-none" value={localItem.question || ""} onChange={e => handleChange('question', e.target.value)} />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-xs font-medium text-gray-400 mb-1">Resposta</label>
                            <textarea className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-1 focus:ring-secondary outline-none min-h-[120px]" value={localItem.answer || ""} onChange={e => handleChange('answer', e.target.value)} />
                        </div>
                    </>
                )}

                {type === 'testimonials' && (
                    <>
                        <div className="col-span-1">
                            <label className="block text-xs font-medium text-gray-400 mb-1">Nome do Cliente</label>
                            <input type="text" className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-1 focus:ring-secondary outline-none" value={localItem.name || ""} onChange={e => handleChange('name', e.target.value)} />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-xs font-medium text-gray-400 mb-1">Cargo / Empresa</label>
                            <input type="text" className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-1 focus:ring-secondary outline-none" value={localItem.title || ""} onChange={e => handleChange('title', e.target.value)} />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-xs font-medium text-gray-400 mb-1">Depoimento</label>
                            <textarea className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-1 focus:ring-secondary outline-none min-h-[80px]" value={localItem.quote || ""} onChange={e => handleChange('quote', e.target.value)} />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-xs font-medium text-gray-400 mb-1">Link da Foto (URL)</label>
                            <input type="text" className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-1 focus:ring-secondary outline-none" value={localItem.image || ""} onChange={e => handleChange('image', e.target.value)} />
                            {localItem.image && (
                                <img src={localItem.image} alt="Preview" className="w-12 h-12 rounded-full mt-2 object-cover border border-gray-700" />
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
