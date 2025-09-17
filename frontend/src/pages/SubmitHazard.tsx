import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Camera, Mic, Upload, AlertTriangle, Waves, Zap, Eye, FileText, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useOffline } from '@/contexts/OfflineContext';
import { Navbar } from '@/components/common/Navbar';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { apiPlaceholders } from '@/lib/mockData';

const SubmitHazard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isOnline, addPendingReport } = useOffline();
  const { toast } = useToast();
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<GeolocationPosition | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  
  const [formData, setFormData] = useState({
    type: '',
    severity: '',
    title: '',
    description: '',
    location: '',
    media: [] as File[],
    voiceNote: null as Blob | null,
  });

  // Get current location with loading state
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsGettingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation(position);
          // Reverse geocoding would happen here in a real app
          setFormData(prev => ({
            ...prev,
            location: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`
          }));
          toast({
            title: "Location captured",
            description: "GPS coordinates added to your report",
          });
          setIsGettingLocation(false);
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Unable to get your current location",
            variant: "destructive",
          });
          setIsGettingLocation(false);
        }
      );
    }
  };

  // Handle file upload with progress
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    setFormData(prev => ({
      ...prev,
      media: [...prev.media, ...files].slice(0, 5) // Max 5 files
    }));
  };

  // Handle voice recording (mock implementation)
  const toggleVoiceRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      // In a real app, this would stop recording and convert to text
      toast({
        title: "Recording stopped",
        description: "Voice note will be converted to text",
      });
    } else {
      setIsRecording(true);
      toast({
        title: "Recording started",
        description: "Speak clearly to describe the hazard",
      });
      
      // Auto-stop after 30 seconds (mock)
      setTimeout(() => {
        setIsRecording(false);
        setFormData(prev => ({
          ...prev,
          description: prev.description + (prev.description ? ' ' : '') + 
            '[Voice note: Large waves approaching shore, visibility poor due to storm conditions]'
        }));
      }, 3000);
    }
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.type || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please select hazard type and add description",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const reportData = {
      type: formData.type as any,
      severity: formData.severity as any || 'medium',
      title: formData.title || `${formData.type} Report`,
      description: formData.description,
      location: {
        lat: currentLocation?.coords.latitude || 0,
        lng: currentLocation?.coords.longitude || 0,
        address: formData.location || 'Unknown location'
      },
      media: formData.media.map(file => file.name), // In real app, upload files and get URLs
    };

    try {
      if (isOnline) {
        await apiPlaceholders.submitHazardReport(reportData);
        toast({
          title: "Report Submitted",
          description: "Your hazard report has been submitted successfully",
        });
      } else {
        addPendingReport(reportData);
        toast({
          title: "Report Saved",
          description: "Report saved offline and will sync when connection is restored",
        });
      }
      
      navigate('/citizen/dashboard');
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const hazardTypes = [
    { value: 'tsunami', label: 'Tsunami', icon: Waves, color: 'text-danger' },
    { value: 'storm', label: 'Storm', icon: Zap, color: 'text-warning' },
    { value: 'flood', label: 'Flood', icon: AlertTriangle, color: 'text-danger' },
    { value: 'pollution', label: 'Pollution', icon: Eye, color: 'text-warning' },
    { value: 'other', label: 'Other', icon: FileText, color: 'text-muted-foreground' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
        <div className="max-w-2xl mx-auto py-6 px-4 mobile-padding">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/citizen/dashboard')}
            className="touch-target"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-responsive-lg font-bold text-foreground">Submit Hazard Report</h1>
            <p className="text-muted-foreground">Help keep the community informed and safe</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Hazard Type */}
          <Card>
            <CardHeader>
              <CardTitle>Hazard Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {hazardTypes.map((type) => (
                  <Button
                    key={type.value}
                    type="button"
                    variant={formData.type === type.value ? 'ocean' : 'outline'}
                    className="h-auto p-4 flex flex-col items-center gap-2"
                    onClick={() => setFormData(prev => ({ ...prev, type: type.value }))}
                  >
                    <type.icon className={`w-6 h-6 ${formData.type === type.value ? 'text-white' : type.color}`} />
                    <span className="text-sm">{type.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Severity Level */}
          <Card>
            <CardHeader>
              <CardTitle>Severity Level</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={formData.severity} onValueChange={(value) => setFormData(prev => ({ ...prev, severity: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select severity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - Minor impact expected</SelectItem>
                  <SelectItem value="medium">Medium - Moderate risk to safety</SelectItem>
                  <SelectItem value="high">High - Immediate danger</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="mobile-card">
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Enter location or use GPS"
                  className="flex-1 touch-target"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={getCurrentLocation}
                  disabled={isGettingLocation}
                  className="touch-target"
                >
                  {isGettingLocation ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <MapPin className="w-4 h-4" />
                  )}
                </Button>
              </div>
              {currentLocation && (
                <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
                  <p className="text-sm text-success font-medium">
                    ✓ Location captured successfully
                  </p>
                  <p className="text-xs text-success/80 mt-1">
                    GPS: {currentLocation.coords.latitude.toFixed(4)}, {currentLocation.coords.longitude.toFixed(4)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title (Optional)</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Brief title for the hazard"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what you're observing..."
                  rows={4}
                  required
                />
              </div>

              {/* Voice Note */}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={isRecording ? 'danger' : 'outline'}
                  onClick={toggleVoiceRecording}
                  className="flex-1"
                >
                  <Mic className={`w-4 h-4 mr-2 ${isRecording ? 'animate-pulse' : ''}`} />
                  {isRecording ? 'Recording...' : 'Add Voice Note'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Media Upload */}
          <Card className="mobile-card">
            <CardHeader>
              <CardTitle>Photos & Videos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full touch-target"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Add Photos/Videos ({formData.media.length}/5)
                </Button>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />

                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="w-full" />
                  </div>
                )}

                {formData.media.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {formData.media.map((file, index) => (
                      <div key={index} className="p-3 border border-border rounded-lg text-sm mobile-card">
                        <div className="flex items-center gap-2">
                          <Upload className="w-4 h-4 text-primary" />
                          <span className="truncate">{file.name}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/citizen/dashboard')}
              className="flex-1 touch-target"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="ocean"
              disabled={isSubmitting}
              className="flex-1 touch-target"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                isOnline ? 'Submit Report' : 'Save Offline'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitHazard;