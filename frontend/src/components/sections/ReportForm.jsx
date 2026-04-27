import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
    MapPin,
    Loader2,
    ImagePlus,
    Send,
    CheckCircle2,
    X,
    Crosshair,
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const WASTE_TYPES = [
    "Plastic",
    "Organic",
    "E-Waste",
    "Construction Debris",
    "Hazardous",
    "Mixed",
    "Other",
];

const MAX_PHOTO_BYTES = 2_500_000; // ~2.5 MB raw; base64 ~3.3MB

function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(r.result);
        r.onerror = reject;
        r.readAsDataURL(file);
    });
}

export default function ReportForm() {
    const [location, setLocation] = useState("");
    const [wasteType, setWasteType] = useState("");
    const [description, setDescription] = useState("");
    const [reporterName, setReporterName] = useState("");
    const [reporterContact, setReporterContact] = useState("");
    const [coords, setCoords] = useState({ lat: null, lng: null });
    const [photoDataUrl, setPhotoDataUrl] = useState("");
    const [photoName, setPhotoName] = useState("");
    const [locBusy, setLocBusy] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(null);
    const fileRef = useRef(null);

    const handleUseLocation = () => {
        if (!("geolocation" in navigator)) {
            toast.error("Geolocation not supported by this browser");
            return;
        }
        setLocBusy(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                setCoords({ lat: latitude, lng: longitude });
                setLocation(
                    (prev) =>
                        prev ||
                        `GPS: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`,
                );
                toast.success("Location captured", {
                    description: `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`,
                });
                setLocBusy(false);
            },
            (err) => {
                setLocBusy(false);
                toast.error("Could not get location", {
                    description: err.message || "Please allow location access.",
                });
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
        );
    };

    const handlePhotoChange = async (e) => {
        const f = e.target.files?.[0];
        if (!f) return;
        if (!f.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }
        if (f.size > MAX_PHOTO_BYTES) {
            toast.error("Photo too large", {
                description: "Please keep it under 2.5 MB.",
            });
            return;
        }
        const data = await fileToDataUrl(f);
        setPhotoDataUrl(data);
        setPhotoName(f.name);
    };

    const clearPhoto = () => {
        setPhotoDataUrl("");
        setPhotoName("");
        if (fileRef.current) fileRef.current.value = "";
    };

    const resetForm = () => {
        setLocation("");
        setWasteType("");
        setDescription("");
        setReporterName("");
        setReporterContact("");
        setCoords({ lat: null, lng: null });
        clearPhoto();
        setSuccess(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (submitting) return;
        if (!location.trim() || !wasteType || description.trim().length < 5) {
            toast.error("Please fill Location, Waste Type and a short Description");
            return;
        }
        setSubmitting(true);
        try {
            const res = await axios.post(`${API}/reports`, {
                location: location.trim(),
                waste_type: wasteType,
                description: description.trim(),
                latitude: coords.lat ?? null,
                longitude: coords.lng ?? null,
                photo_data_url: photoDataUrl || null,
                reporter_name: reporterName.trim() || null,
                reporter_contact: reporterContact.trim() || null,
            });
            setSuccess(res.data);
            toast.success("Report submitted. Thank you!");
        } catch (err) {
            const msg =
                err?.response?.data?.detail || err.message || "Submission failed";
            toast.error("Could not submit", { description: String(msg) });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section
            id="report"
            data-testid="report-section"
            className="relative bg-[#0B251B]/30 border-t border-[#183D2D]"
        >
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14 py-24 md:py-32 grid lg:grid-cols-12 gap-10 lg:gap-16">
                <div className="lg:col-span-5 reveal">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-[#4AD68B]">
                        Submit a Report
                    </div>
                    <h2 className="font-display mt-5 text-4xl sm:text-5xl lg:text-6xl tracking-tighter font-medium leading-[1.02]">
                        Turn a spot into{" "}
                        <span className="italic text-[#4AD68B]">signal</span>.
                    </h2>
                    <p className="mt-6 text-[#A3B8B0] text-base md:text-lg leading-relaxed max-w-md">
                        Your submission is logged and, if connected, routed straight to the
                        ClearSpace Google Sheet used by local coordinators.
                    </p>

                    <ul className="mt-10 space-y-4 text-sm">
                        {[
                            "No login required",
                            "GPS location in one tap",
                            "Optional photo evidence",
                        ].map((it) => (
                            <li
                                key={it}
                                className="flex items-center gap-3 text-white/85"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#4AD68B]" />
                                {it}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="lg:col-span-7 reveal">
                    <div
                        data-testid="report-form-card"
                        className="relative bg-[#0B251B] border border-[#183D2D] p-6 md:p-10"
                    >
                        {success ? (
                            <div
                                data-testid="report-success"
                                className="min-h-[520px] flex flex-col items-start justify-center"
                            >
                                <div className="w-14 h-14 rounded-full bg-[#4AD68B]/15 grid place-items-center text-[#4AD68B]">
                                    <CheckCircle2 size={28} />
                                </div>
                                <h3 className="font-display mt-6 text-3xl md:text-4xl tracking-tight">
                                    Report received — thank you.
                                </h3>
                                <p className="mt-4 text-[#A3B8B0] max-w-lg">
                                    Tracking ID{" "}
                                    <span className="text-white font-mono text-sm">
                                        {success.id}
                                    </span>
                                    {success.sheet_forwarded
                                        ? " — forwarded to the ClearSpace Google Sheet."
                                        : " — logged to our database."}
                                </p>
                                <div className="mt-8 flex gap-3">
                                    <button
                                        data-testid="report-submit-another"
                                        onClick={resetForm}
                                        className="btn-shine inline-flex items-center gap-2 bg-[#4AD68B] hover:bg-[#6EE0A4] text-[#05130F] font-medium px-6 py-3 rounded-sm text-sm uppercase tracking-[0.16em]"
                                    >
                                        Submit another
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6"
                                data-testid="report-form"
                            >
                                <div>
                                    <label className="text-[11px] uppercase tracking-[0.22em] text-[#4AD68B]">
                                        Location
                                    </label>
                                    <div className="mt-3 flex flex-col sm:flex-row gap-3">
                                        <div className="relative flex-1">
                                            <MapPin
                                                size={16}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A3B8B0]"
                                            />
                                            <input
                                                data-testid="report-location-input"
                                                value={location}
                                                onChange={(e) => setLocation(e.target.value)}
                                                placeholder="Address, area or landmark"
                                                className="w-full bg-transparent border border-[#183D2D] text-white placeholder:text-[#6b8278] pl-10 pr-3 py-3.5 rounded-sm focus:outline-none focus:border-[#4AD68B] transition-colors"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            data-testid="report-gps-button"
                                            onClick={handleUseLocation}
                                            disabled={locBusy}
                                            className="inline-flex items-center justify-center gap-2 border border-[#183D2D] hover:border-[#4AD68B] text-white px-4 py-3.5 rounded-sm text-sm uppercase tracking-[0.16em] transition-colors disabled:opacity-60"
                                        >
                                            {locBusy ? (
                                                <Loader2 size={16} className="animate-spin" />
                                            ) : (
                                                <Crosshair size={16} className="text-[#4AD68B]" />
                                            )}
                                            Use my location
                                        </button>
                                    </div>
                                    {coords.lat && coords.lng && (
                                        <div className="mt-2 text-xs text-[#A3B8B0] font-mono">
                                            lat {coords.lat.toFixed(5)} · lng{" "}
                                            {coords.lng.toFixed(5)}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="text-[11px] uppercase tracking-[0.22em] text-[#4AD68B]">
                                        Type of Waste
                                    </label>
                                    <div className="mt-3">
                                        <Select value={wasteType} onValueChange={setWasteType}>
                                            <SelectTrigger
                                                data-testid="report-waste-type-trigger"
                                                className="w-full bg-transparent border border-[#183D2D] text-white py-6 rounded-sm focus:ring-0 focus:border-[#4AD68B] hover:border-[#245a43]"
                                            >
                                                <SelectValue placeholder="Select a waste category" />
                                            </SelectTrigger>
                                            <SelectContent
                                                className="bg-[#0B251B] border-[#183D2D] text-white"
                                                data-testid="report-waste-type-content"
                                            >
                                                {WASTE_TYPES.map((t) => (
                                                    <SelectItem
                                                        key={t}
                                                        value={t}
                                                        data-testid={`waste-type-${t.toLowerCase().replace(/\s+/g, "-")}`}
                                                        className="focus:bg-[#183D2D] focus:text-white"
                                                    >
                                                        {t}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[11px] uppercase tracking-[0.22em] text-[#4AD68B]">
                                        Description
                                    </label>
                                    <textarea
                                        data-testid="report-description-input"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows={4}
                                        placeholder="What kind of waste, how much, how long has it been there?"
                                        className="mt-3 w-full bg-transparent border border-[#183D2D] text-white placeholder:text-[#6b8278] px-3 py-3 rounded-sm focus:outline-none focus:border-[#4AD68B] transition-colors resize-y"
                                    />
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[11px] uppercase tracking-[0.22em] text-[#4AD68B]">
                                            Your name (optional)
                                        </label>
                                        <input
                                            data-testid="report-name-input"
                                            value={reporterName}
                                            onChange={(e) => setReporterName(e.target.value)}
                                            placeholder="Anonymous"
                                            className="mt-3 w-full bg-transparent border border-[#183D2D] text-white placeholder:text-[#6b8278] px-3 py-3 rounded-sm focus:outline-none focus:border-[#4AD68B] transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[11px] uppercase tracking-[0.22em] text-[#4AD68B]">
                                            Contact (optional)
                                        </label>
                                        <input
                                            data-testid="report-contact-input"
                                            value={reporterContact}
                                            onChange={(e) => setReporterContact(e.target.value)}
                                            placeholder="Phone or email"
                                            className="mt-3 w-full bg-transparent border border-[#183D2D] text-white placeholder:text-[#6b8278] px-3 py-3 rounded-sm focus:outline-none focus:border-[#4AD68B] transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[11px] uppercase tracking-[0.22em] text-[#4AD68B]">
                                        Photo (optional)
                                    </label>
                                    {photoDataUrl ? (
                                        <div
                                            className="mt-3 relative border border-[#183D2D]"
                                            data-testid="report-photo-preview"
                                        >
                                            <img
                                                src={photoDataUrl}
                                                alt="preview"
                                                className="w-full max-h-64 object-cover"
                                            />
                                            <button
                                                type="button"
                                                data-testid="report-photo-clear"
                                                onClick={clearPhoto}
                                                className="absolute top-2 right-2 bg-[#05130F]/80 border border-[#183D2D] text-white p-2 hover:border-[#4AD68B]"
                                                aria-label="Remove photo"
                                            >
                                                <X size={14} />
                                            </button>
                                            <div className="absolute bottom-2 left-2 bg-[#05130F]/80 border border-[#183D2D] px-2 py-1 text-xs text-[#A3B8B0]">
                                                {photoName}
                                            </div>
                                        </div>
                                    ) : (
                                        <label
                                            data-testid="report-photo-dropzone"
                                            className="mt-3 flex flex-col items-center justify-center gap-2 border border-dashed border-[#183D2D] hover:border-[#4AD68B] px-4 py-10 cursor-pointer transition-colors"
                                        >
                                            <ImagePlus size={22} className="text-[#4AD68B]" />
                                            <div className="text-sm text-white/90">
                                                Click to upload a photo
                                            </div>
                                            <div className="text-xs text-[#A3B8B0]">
                                                JPG or PNG · up to 2.5MB
                                            </div>
                                            <input
                                                ref={fileRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={handlePhotoChange}
                                                className="hidden"
                                                data-testid="report-photo-input"
                                            />
                                        </label>
                                    )}
                                </div>

                                <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div className="text-xs text-[#A3B8B0]">
                                        Submissions are logged to the ClearSpace sheet for local
                                        coordinators.
                                    </div>
                                    <button
                                        type="submit"
                                        data-testid="report-submit-button"
                                        disabled={submitting}
                                        className="btn-shine inline-flex items-center justify-center gap-3 bg-[#4AD68B] hover:bg-[#6EE0A4] text-[#05130F] font-medium px-8 py-4 rounded-sm text-sm uppercase tracking-[0.16em] disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {submitting ? (
                                            <Loader2 size={16} className="animate-spin" />
                                        ) : (
                                            <Send size={16} />
                                        )}
                                        {submitting ? "Submitting…" : "Submit Report"}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
