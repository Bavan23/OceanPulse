import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Camera, Mic, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/enhanced-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/common/Navbar';

const TermsPage: React.FC = () => {
  const permissions = [
    {
      icon: MapPin,
      title: "Location Access",
      description: "Required to geotag hazard reports and show relevant alerts for your area"
    },
    {
      icon: Camera,
      title: "Camera & Photo Library",
      description: "Upload photos and videos as evidence for hazard reports"
    },
    {
      icon: Mic,
      title: "Microphone Access",
      description: "Record voice notes for faster hazard reporting using speech-to-text"
    },
    {
      icon: Smartphone,
      title: "Device Storage",
      description: "Store reports offline when internet connection is unavailable"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Terms & Privacy</h1>
            <p className="text-muted-foreground">Understanding how OceanPulse works</p>
          </div>
        </div>

        {/* Permissions Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="w-6 h-6 text-primary" />
              Required Permissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              OceanPulse requires certain permissions to provide the best hazard reporting experience:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {permissions.map((permission) => (
                <div 
                  key={permission.title}
                  className="flex items-start gap-3 p-4 rounded-lg border border-border bg-muted/30"
                >
                  <div className="p-2 gradient-ocean rounded-lg flex-shrink-0">
                    <permission.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{permission.title}</h3>
                    <p className="text-sm text-muted-foreground">{permission.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Terms of Service */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <h3 className="text-lg font-semibold mb-3">1. Acceptance of Terms</h3>
            <p className="text-muted-foreground mb-4">
              By using OceanPulse, you agree to these terms and conditions. OceanPulse is a 
              crowdsourced ocean hazard reporting platform designed to help communities stay 
              safe through collective intelligence.
            </p>

            <h3 className="text-lg font-semibold mb-3">2. User Responsibilities</h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-1">
              <li>Provide accurate and truthful information in hazard reports</li>
              <li>Respect privacy and safety when taking photos or videos</li>
              <li>Do not submit false or misleading reports</li>
              <li>Follow local laws and regulations when reporting hazards</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3">3. Content and Media</h3>
            <p className="text-muted-foreground mb-4">
              By uploading photos, videos, or voice recordings to OceanPulse, you grant us 
              permission to use this content for the purpose of hazard monitoring and public 
              safety. We will not share your personal information without consent.
            </p>

            <h3 className="text-lg font-semibold mb-3">4. Data Usage</h3>
            <p className="text-muted-foreground mb-4">
              OceanPulse analyzes social media trends and user reports to identify potential 
              hazards. All data is processed in accordance with privacy regulations and used 
              solely for public safety purposes.
            </p>
          </CardContent>
        </Card>

        {/* Privacy Policy */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <h3 className="text-lg font-semibold mb-3">Information We Collect</h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-1">
              <li>Location data (with your permission) for hazard geotags</li>
              <li>Photos and videos uploaded with hazard reports</li>
              <li>Voice recordings (converted to text and then deleted)</li>
              <li>Account information (email, name, role)</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3">How We Use Your Information</h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-1">
              <li>Create accurate hazard reports and alerts</li>
              <li>Analyze trends and patterns in ocean hazards</li>
              <li>Improve our AI-powered severity scoring</li>
              <li>Send relevant safety notifications</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3">Data Protection</h3>
            <p className="text-muted-foreground mb-4">
              We implement industry-standard security measures to protect your data. 
              Location data is anonymized for analytics, and personal information is 
              never shared with third parties without your explicit consent.
            </p>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">Ready to Get Started?</h2>
            <p className="text-muted-foreground">
              Join the community helping to keep our oceans safe
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="ocean" size="lg" asChild>
              <Link to="/auth">Create Account</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;