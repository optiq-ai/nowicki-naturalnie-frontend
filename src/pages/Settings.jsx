import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { useToast } from "../hooks/use-toast";

function Settings() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("password");

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Company data state
  const [companyName, setCompanyName] = useState("Nowicki Naturalnie");
  const [companyAddress, setCompanyAddress] = useState("ul. Gruszowa 5, 63-500 Potaśnia");
  const [companyPhone, setCompanyPhone] = useState("+48 62 730 08 00");
  const [companyEmail, setCompanyEmail] = useState("kontakt@nowickinaturalnie.pl");
  const [companyDescription, setCompanyDescription] = useState("Naturalne wędliny wytwarzane według tradycyjnych receptur, bez konserwantów i ulepszaczy. Smak, który pamięta się na zawsze.");

  // Certifications state
  const [certificationName, setCertificationName] = useState("");
  const [certificationDescription, setCertificationDescription] = useState("");
  const [certifications, setCertifications] = useState([
    { name: "Sieć Dziedzictwa Kulinarnego Wielkopolski", description: "Potwierdzenie zaangażowania w kultywowanie lokalnych tradycji kulinarnych." },
    { name: "Certyfikowane produkty bezglutenowe", description: "Spełnienie najwyższych standardów jakości i bezpieczeństwa dla osób z celiakią." },
    { name: "Złotnicka Premium", description: "Wyróżnienie za najlepszy wyrób z wieprzowiny złotnickiej." },
  ]);

  // Social Media state
  const [facebookUrl, setFacebookUrl] = useState("https://facebook.com/nowickinaturalnie");
  const [instagramUrl, setInstagramUrl] = useState("https://instagram.com/nowickinaturalnie");
  const [twitterUrl, setTwitterUrl] = useState("");

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!currentPassword) {
      toast({ title: "Błąd", description: "Wprowadź aktualne hasło", variant: "destructive" });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ title: "Błąd", description: "Nowe hasło i potwierdzenie nie są identyczne", variant: "destructive" });
      return;
    }
    if (newPassword.length < 8) {
      toast({ title: "Błąd", description: "Nowe hasło musi mieć co najmniej 8 znaków", variant: "destructive" });
      return;
    }
    toast({ title: "Sukces", description: "Hasło zostało zmienione pomyślnie" });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleCompanyDataSubmit = (e) => {
    e.preventDefault();
    if (!companyName || !companyAddress || !companyPhone || !companyEmail) {
      toast({ title: "Błąd", description: "Wszystkie pola podstawowe (nazwa, adres, telefon, email) są wymagane", variant: "destructive" });
      return;
    }
    toast({ title: "Sukces", description: "Dane firmy zostały zaktualizowane pomyślnie" });
  };

  const handleAddCertification = (e) => {
    e.preventDefault();
    if (!certificationName) {
      toast({ title: "Błąd", description: "Wprowadź nazwę certyfikatu", variant: "destructive" });
      return;
    }
    setCertifications([...certifications, { name: certificationName, description: certificationDescription }]);
    setCertificationName("");
    setCertificationDescription("");
    toast({ title: "Sukces", description: "Certyfikat został dodany" });
  };

  const handleRemoveCertification = (indexToRemove) => {
    setCertifications(certifications.filter((_, index) => index !== indexToRemove));
    toast({ title: "Sukces", description: "Certyfikat został usunięty" });
  };

  const handleSocialMediaSubmit = (e) => {
    e.preventDefault();
    // Add URL validation if needed
    toast({ title: "Sukces", description: "Linki do mediów społecznościowych zostały zaktualizowane" });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6 font-[var(--header-font)]">Ustawienia</h1>

      <Tabs defaultValue="password" className="w-full" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="password">Hasło</TabsTrigger>
          <TabsTrigger value="company">Dane firmy</TabsTrigger>
          <TabsTrigger value="certifications">Certyfikaty</TabsTrigger>
          <TabsTrigger value="social">Media Społecznościowe</TabsTrigger>
        </TabsList>

        {/* Password Tab */}
        <TabsContent value="password">
          <Card className="card-premium">
            <CardHeader>
              <CardTitle>Zmiana hasła</CardTitle>
              <CardDescription>
                Zmień swoje hasło dostępu do systemu. Hasło powinno mieć co najmniej 8 znaków.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Aktualne hasło</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    className="form-input-premium"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nowe hasło</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="form-input-premium"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Potwierdź nowe hasło</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="form-input-premium"
                  />
                </div>
                <Button type="submit" className="w-full hover-lift">Zmień hasło</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Company Data Tab */}
        <TabsContent value="company">
          <Card className="card-premium">
            <CardHeader>
              <CardTitle>Dane firmy</CardTitle>
              <CardDescription>
                Zaktualizuj dane firmy, które będą widoczne na stronie i dokumentach.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCompanyDataSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Nazwa firmy</Label>
                  <Input
                    id="company-name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    className="form-input-premium"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-address">Adres</Label>
                  <Input
                    id="company-address"
                    value={companyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                    required
                    className="form-input-premium"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-phone">Telefon</Label>
                  <Input
                    id="company-phone"
                    value={companyPhone}
                    onChange={(e) => setCompanyPhone(e.target.value)}
                    required
                    className="form-input-premium"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-email">Email</Label>
                  <Input
                    id="company-email"
                    type="email"
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                    required
                    className="form-input-premium"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-description">Opis firmy</Label>
                  <Textarea
                    id="company-description"
                    value={companyDescription}
                    onChange={(e) => setCompanyDescription(e.target.value)}
                    rows={4}
                    className="form-input-premium"
                  />
                </div>
                <Button type="submit" className="w-full hover-lift">Zapisz zmiany</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Certifications Tab */}
        <TabsContent value="certifications">
          <Card className="card-premium">
            <CardHeader>
              <CardTitle>Certyfikaty i wyróżnienia</CardTitle>
              <CardDescription>
                Zarządzaj listą certyfikatów i wyróżnień firmy.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* List existing certifications */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Aktualne certyfikaty</h3>
                {certifications.length > 0 ? (
                  <ul className="space-y-3">
                    {certifications.map((cert, index) => (
                      <li key={index} className="flex justify-between items-start p-3 border rounded-md bg-gray-50">
                        <div>
                          <p className="font-semibold">{cert.name}</p>
                          {cert.description && <p className="text-sm text-gray-600 mt-1">{cert.description}</p>}
                        </div>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => handleRemoveCertification(index)}
                          className="ml-4 hover-lift"
                        >
                          Usuń
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">Brak dodanych certyfikatów.</p>
                )}
              </div>

              {/* Add new certification form */}
              <form onSubmit={handleAddCertification} className="space-y-4 border-t pt-6">
                <h3 className="text-lg font-medium">Dodaj nowy certyfikat</h3>
                <div className="space-y-2">
                  <Label htmlFor="certification-name">Nazwa certyfikatu</Label>
                  <Input
                    id="certification-name"
                    value={certificationName}
                    onChange={(e) => setCertificationName(e.target.value)}
                    required
                    className="form-input-premium"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certification-description">Opis (opcjonalnie)</Label>
                  <Textarea
                    id="certification-description"
                    value={certificationDescription}
                    onChange={(e) => setCertificationDescription(e.target.value)}
                    rows={3}
                    className="form-input-premium"
                  />
                </div>
                <Button type="submit" className="w-full hover-lift">Dodaj certyfikat</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Media Tab */}
        <TabsContent value="social">
          <Card className="card-premium">
            <CardHeader>
              <CardTitle>Media Społecznościowe</CardTitle>
              <CardDescription>
                Zaktualizuj linki do profili firmy w mediach społecznościowych.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSocialMediaSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook-url">Facebook URL</Label>
                  <Input
                    id="facebook-url"
                    type="url"
                    value={facebookUrl}
                    onChange={(e) => setFacebookUrl(e.target.value)}
                    placeholder="https://facebook.com/twojprofil"
                    className="form-input-premium"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram-url">Instagram URL</Label>
                  <Input
                    id="instagram-url"
                    type="url"
                    value={instagramUrl}
                    onChange={(e) => setInstagramUrl(e.target.value)}
                    placeholder="https://instagram.com/twojprofil"
                    className="form-input-premium"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter-url">Twitter (X) URL</Label>
                  <Input
                    id="twitter-url"
                    type="url"
                    value={twitterUrl}
                    onChange={(e) => setTwitterUrl(e.target.value)}
                    placeholder="https://twitter.com/twojprofil"
                    className="form-input-premium"
                  />
                </div>
                {/* Add more social media links if needed */}
                <Button type="submit" className="w-full hover-lift">Zapisz linki</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}

export default Settings;

